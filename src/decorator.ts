import { IValidationErrorCause, ValidationError } from './error';

const DEFAULT_GROUP = '__DEFAULT';
const VALIDATE_KEY = '__VALIDATE';
const GROUP_KEY = '__GROUP';
const ERROR_KEY = '__ERROR';

export interface IValidateOption {
  group?: string;
}

export type PropAnnotation = (target: object, propertyKey: string) => void;

type TValidator = (value: unknown, propertyKey: string) => IValidationErrorCause | undefined;
type TValidateProperty = { propertyKey: string; groups: { [group: string]: TValidator[] } };

export function propDecorator(validator: TValidator, groups: string[] = []): PropAnnotation {
  return (target: object, propertyKey: string) => {
    const properties: TValidateProperty[] = Reflect.get(target, VALIDATE_KEY) || [];
    const property: TValidateProperty = properties.filter(
      it => it.propertyKey === propertyKey,
    )[0] || { propertyKey, groups: {} };
    const validate = value => validator(value, propertyKey);

    if (groups.length === 0) groups = [DEFAULT_GROUP];
    for (const groupName of groups) {
      const group = property.groups[groupName] || [];
      group.push(validate);
      property.groups[groupName] = group;
    }

    properties.push(property);
    if (!Reflect.has(target, VALIDATE_KEY)) Reflect.set(target, VALIDATE_KEY, properties);

    /* Setter function */
    function setter(newValue: any) {
      if (!this[ERROR_KEY]) this[ERROR_KEY] = [];
      if (!this.hasOwnProperty(property.propertyKey)) {
        Reflect.defineProperty(this, privateKey, { enumerable: false, writable: true });
        Reflect.defineProperty(this, property.propertyKey, {
          get: () => this[privateKey],
          set: setter,
          enumerable: true,
        });
      }

      for (const func of property.groups[this.constructor[GROUP_KEY]] || []) {
        const err = func(newValue, property.propertyKey);
        if (err) this[ERROR_KEY].push(err);
      }
      this[privateKey] = newValue;
    }

    /* Define getter / setter */
    const privateKey = '_' + property.propertyKey;
    Reflect.defineProperty(target, property.propertyKey, {
      set: setter,
      get: function () {
        return this[privateKey];
      },
      enumerable: true,
    });
  };
}

const defaultOption: IValidateOption = { group: DEFAULT_GROUP };

export function Validate(option: IValidateOption = defaultOption) {
  return <T extends new (...args: any[]) => {}>(target: T) => {
    Reflect.defineProperty(target, GROUP_KEY, { enumerable: false, value: option.group });

    return class V extends target {
      constructor(...args: any[]) {
        super(...args);
        Reflect.defineProperty(this, ERROR_KEY, { enumerable: false, writable: false });

        if (this[ERROR_KEY].length) {
          const messages = args[1] || V['messages'] || {};
          for (const error of this[ERROR_KEY]) {
            if (error.message.startsWith('{') && error.message.endsWith('}')) {
              const key = error.message.slice(1, error.message.length - 1);
              error.message = messages[key] || error.message;
            }
          }

          throw new ValidationError(this[ERROR_KEY]);
        }
      }
    };
  };
}
