/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

import {IValidationErrorCause} from "../error";

export const errorContainer = Symbol("__errorContainer");

export interface IClassDecoratorOption {
  throwable?: boolean;
}

export interface IPropValidateResponse {
  error?: IValidationErrorCause;
  value?: any;
}

export function propDecorator(setter: (newValue: any, propertyKey: string | symbol) => IPropValidateResponse) {
  return (target: any, propertyKey: string | symbol) => {
    const privateKey = "_" + propertyKey.toString();
    Reflect.deleteProperty(target, propertyKey);
    Reflect.defineProperty(target, propertyKey, {
      get: function() {
        return this[privateKey];
      },
      set: function(newValue: any) {
        const propValidateResponse = setter(newValue, propertyKey);
        if (propValidateResponse.error) {
          ensureErrorContainer(target);
          this[errorContainer] = [...this[errorContainer], propValidateResponse.error];
        } else {
          this[privateKey] = propValidateResponse.value;
        }
      },
    });
  };
}

function ensureErrorContainer(target: any) {
  if (!Reflect.has(target, errorContainer)) {
    Reflect.set(target, errorContainer, []);
  }
}
