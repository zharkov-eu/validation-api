/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

import {ValidationError} from "../error";
import * as validator from "../validate";
import {errorContainer, IClassDecoratorOption, IPropValidateResponse, propDecorator} from "./shared";

export interface IPropDecoratorOption {
  message?: string;
  required?: boolean;
}

export function Validate(option: IClassDecoratorOption = {throwable: true}) {
  return <T extends { new(...args: any[]): {} }>(target: T) => {
    return class extends target {
      constructor(...args) {
        super(...args);
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

export function NotEmpty(option: IPropDecoratorOption = {message: "", required: false}) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validator.validateNotEmpty(newValue)) {
      return {
        error: {
          constraint: "NotEmpty",
          message: option.message || propertyKey.toString() + "is empty",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return {value: newValue};
  });
}

export function IsBoolean(option: IPropDecoratorOption = {message: "", required: false}) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validator.validateBoolean(newValue)) {
      return {
        error: {
          constraint: "IsBoolean",
          message: option.message || propertyKey.toString() + " is not a Boolean",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return {value: newValue};
  });
}

export function IsNumber(option: IPropDecoratorOption = {message: "", required: false}) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validator.validateNumber(newValue)) {
      return {
        error: {
          constraint: "IsNumber",
          message: option.message || propertyKey.toString() + "is not a Number",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return {value: newValue};
  });
}

export function IsPositiveNumber(option: IPropDecoratorOption = {message: "", required: false}) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validator.validatePositiveNumber(newValue)) {
      return {
        error: {
          constraint: "IsPositiveNumber",
          message: option.message || propertyKey.toString() + "is not a positive Number",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return {value: newValue};
  });
}

export function IsPositiveOrZeroNumber(option: IPropDecoratorOption = {message: "", required: false}) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validator.validatePositiveOrZeroNumber(newValue)) {
      return {
        error: {
          constraint: "IsPositiveOrZeroNumber",
          message: option.message || propertyKey.toString() + "is not a positive or zero Number",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return {value: newValue};
  });
}

export function NotEmptyString(option: IPropDecoratorOption = {message: "", required: false}) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validator.validateNotEmptyString(newValue)) {
      return {
        error: {
          constraint: "NotEmptyString",
          message: option.message || propertyKey.toString() + "is not a String with content",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return {value: newValue};
  });
}
