/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

import {IValidationErrorCause, ValidationError} from "../error";
import {IPropDecoratorOption} from "./api";

export const requiredContainer = Symbol("__requiredContainer");
export const errorContainer = Symbol("__errorContainer");

export interface IClassDecoratorOption {
  throwable?: boolean;
}

export interface IPropValidateResponse {
  error?: IValidationErrorCause;
  value?: any;
}

export function propDecorator(setter: (newValue: any, propertyKey: string | symbol) => IPropValidateResponse,
                              option: IPropDecoratorOption) {
  return (target: any, propertyKey: string | symbol) => {
    // required property processing
    if (option.required) {
      ensureProperty(target, requiredContainer, []);
      this[requiredContainer] = [...this[requiredContainer], propertyKey];
    }

    // validation property processing
    const privateKey = "_" + propertyKey.toString();
    Reflect.deleteProperty(target, propertyKey);
    Reflect.defineProperty(target, propertyKey, {
      get: function() {
        return this[privateKey];
      },
      set: function(newValue: any) {
        const propValidateResponse = setter(newValue, propertyKey);
        if (propValidateResponse.error) {
          ensureProperty(target, errorContainer, []);
          this[errorContainer] = [...this[errorContainer], propValidateResponse.error];
        } else {
          this[privateKey] = propValidateResponse.value;
        }
      },
    });
  };
}

export function Validate(option: IClassDecoratorOption = {throwable: true}) {
  return <T extends { new(...args: any[]): {} }>(target: T) => {
    return class extends target {
      constructor(...args) {
        super(...args);

        // required property processing
        if (Reflect.has(this, requiredContainer) && Reflect.get(this, requiredContainer).length) {
          const requiredProps = Reflect.get(this, requiredContainer);
          requiredProps.forEach((propertyKey: string | symbol) => {
            if (!Reflect.has(this, propertyKey) || Reflect.get(this, propertyKey) === undefined) {
              ensureProperty(this, errorContainer, []);
              this[errorContainer] = [...this[errorContainer], {
                constraint: "Required",
                message: propertyKey.toString() + " is required",
                property: propertyKey.toString(),
                value: undefined,
              } as IValidationErrorCause];
            }
          });
        }

        // property validation processing
        if (Reflect.has(this, errorContainer) && Reflect.get(this, errorContainer).length) {
          if (option.throwable) {
            throw new ValidationError(Reflect.get(this, errorContainer));
          } else {
            this["__validationError"] = () => Reflect.get(this, errorContainer);
          }
        }
      }
    };
  };
}

function ensureProperty(target: any, key: string | symbol, value: any) {
  if (!Reflect.has(target, key)) {
    Reflect.set(target, key, value);
  }
}
