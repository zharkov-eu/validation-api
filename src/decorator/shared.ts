/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

import { IValidationErrorCause, ValidationError } from "../error";
import { Constraint, IPropDecoratorOption } from "./api";

export const requiredContainer = "__requiredContainer";
export const errorContainer = "__errorContainer";

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
      target[requiredContainer] = [...target[requiredContainer], propertyKey];
    }

    // validation property processing
    const privateKey = "_" + propertyKey.toString();
    const getFunction = function() {
      return this[privateKey];
    };
    const setFunction = function(newValue: any) {
      const propValidateResponse = setter(newValue, propertyKey);
      if (propValidateResponse.error) {
        ensureProperty(this, errorContainer, []);
        this[errorContainer] = [...this[errorContainer], propValidateResponse.error];
      } else {
        this[privateKey] = propValidateResponse.value;
      }
    };
    Reflect.deleteProperty(target, propertyKey);
    Reflect.defineProperty(target, propertyKey, {
      enumerable: true,
      get: getFunction,
      set: function(newValue: any) {
        Reflect.defineProperty(this, privateKey, {
          enumerable: false,
          writable: true,
        });
        Reflect.defineProperty(this, propertyKey, {
          enumerable: true,
          get: getFunction,
          set: setFunction,
        });
        setFunction.call(this, newValue);
      },
    });
  };
}

export function Validate() {
  return <T extends new(...args: any[]) => any>(target: T) => {
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
                constraint: Constraint.Required,
                message: propertyKey.toString() + " is required",
                property: propertyKey.toString(),
                value: undefined,
              }];
            }
          });
        }

        // property validation processing
        if (Reflect.has(this, errorContainer) && Reflect.get(this, errorContainer).length) {
          const messages = Reflect.getPrototypeOf(this).constructor["messages"];
          // error messages processing
          if (messages)
            for (const error of Reflect.get(this, errorContainer) as ValidationError[])
              if (error.message.startsWith("{") && error.message.endsWith("}"))
                error.message = messages[error.message.slice(1, error.message.length - 1)] || error.message;

          throw new ValidationError(Reflect.get(this, errorContainer));
        }

        // clear context
        Reflect.deleteProperty(this, errorContainer);
        Reflect.deleteProperty(this, requiredContainer);
      }
    };
  };
}

function ensureProperty(target: any, key: string | symbol, value: any): void {
  if (!Reflect.has(target, key)) {
    Reflect.set(target, key, value);
  }
}
