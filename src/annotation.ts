/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

import * as validator from "./validate";
import {ValidationError} from "./error";

function validate(target: any, propertyKey: string, setter: (newValue: any) => any) {
  if (Object.hasOwnProperty(target[propertyKey])) {
    delete target[propertyKey];
  }
  let value: number;
  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newValue: any) => {
      value = setter(newValue);
    },
  });
}

export interface IAnnotationOption {
  message: string;
  throwable?: boolean;
}

export function NotEmpty(option: IAnnotationOption) {
  return (target: any, propertyKey: string) =>
    validate(target, propertyKey, (newValue: any) => {
      if (!validator.validateNotEmpty(newValue)) {
        throw new ValidationError([{
          constraint: "NotEmpty",
          message: option.message || propertyKey + "is empty",
          property: propertyKey,
          value: newValue,
        }]);
      }
      return newValue;
    })
}

export function IsBoolean(option: IAnnotationOption) {
  return (target: any, propertyKey: string) =>
    validate(target, propertyKey, (newValue: any) => {
      if (!validator.validateBoolean(newValue)) {
        throw new ValidationError([{
          constraint: "IsBoolean",
          message: option.message || propertyKey + "is not a Boolean",
          property: propertyKey,
          value: newValue,
        }]);
      }
      return newValue;
    })
}

export function IsNumber(option: IAnnotationOption) {
  return (target: any, propertyKey: string) =>
    validate(target, propertyKey, (newValue: any) => {
      if (!validator.validateNumber(newValue)) {
        throw new ValidationError([{
          constraint: "IsNumber",
          message: option.message || propertyKey + "is not a Number",
          property: propertyKey,
          value: newValue,
        }]);
      }
      return newValue;
    })
}
