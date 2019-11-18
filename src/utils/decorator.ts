/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

import { IValidateOption, IValidationErrorCause } from "../../index";
import { ValidationError } from "../error";

const DEFAULT_GROUP = "__DEFAULT";
const VALIDATE_KEY = "__VALIDATE";
const GROUP_KEY = "__GROUP";
const ERROR_KEY = "__ERROR";

type TValidator = (value: any, propertyKey: string) => IValidationErrorCause | undefined;
type TValidateProperty = { propertyKey: string, groups: { [group: string]: TValidator[] } };

export function propDecorator(validator: TValidator, groups: string[] = []) {
  return (target: object, propertyKey: string) => {
    const properties: TValidateProperty[] = Reflect.get(target, VALIDATE_KEY) || [];
    const property: TValidateProperty =
      properties.filter(it => it.propertyKey === propertyKey)[0] || { propertyKey, groups: {} };
    const validate = (value) => validator(value, propertyKey);

    if (groups.length === 0) groups = [DEFAULT_GROUP];
    for (const groupName of groups) {
      const group = property.groups[groupName] || [];
      group.push(validate);
      property.groups[groupName] = group;
    }

    properties.push(property);
    if (!Reflect.has(target, VALIDATE_KEY)) {
      Reflect.defineProperty(target, VALIDATE_KEY, { enumerable: false, writable: true });
      Reflect.set(target, VALIDATE_KEY, properties);
    }

    /* Define getter / setter */
    const privateKey = "_" + property.propertyKey;
    Reflect.defineProperty(target, privateKey, { enumerable: false, writable: true });
    Reflect.defineProperty(target, property.propertyKey, {
      get: function() {
        return this[privateKey];
      },
      set: function(newValue: any) {
        if (!this[ERROR_KEY]) this[ERROR_KEY] = [];

        for (const func of property.groups[this.constructor[GROUP_KEY]] || []) {
          const err = func(newValue, property.propertyKey);
          if (err) this[ERROR_KEY].push(err);
        }
        this[privateKey] = newValue;
      },
      enumerable: true,
    });
  };
}

const defaultOption: IValidateOption = { group: DEFAULT_GROUP };

export function Validate(option: IValidateOption = defaultOption): any {
  return <T extends new(...args: any[]) => {}>(target: T) => {
    Reflect.defineProperty(target, GROUP_KEY, { enumerable: false, value: option.group });

    return class V extends target {
      constructor(...args) {
        super(...args);
        Reflect.defineProperty(this, ERROR_KEY, { enumerable: false, writable: false });

        if (this[ERROR_KEY].length) {
          const messages = V["messages"] || {};
          for (const error of this[ERROR_KEY])
            if (error.message.startsWith("{") && error.message.endsWith("}"))
              error.message = messages[error.message.slice(1, error.message.length - 1)] || error.message;

          throw new ValidationError(this[ERROR_KEY]);
        }
      }
    };
  };
}
