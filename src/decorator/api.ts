/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import * as validator from "../validate";
import { IPropValidateResponse, propDecorator } from "./shared";

export interface IPropDecoratorOption {
  message?: string;
  required?: boolean;
}

export interface INumberPropDecorationOption extends IPropDecoratorOption {
  min?: number;
  max?: number;
}

export interface IMemberOfPropDecorationOption extends IPropDecoratorOption {
  array: any[];
}

function setterShortcut(validate: (candidate: any) => boolean, constraintName: string, option: IPropDecoratorOption) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validate(newValue)) {
      return {
        error: {
          constraint: constraintName,
          message: option.message || propertyKey.toString() + " is invalid by " + constraintName + " constraint",
          property: propertyKey.toString(),
          value: newValue,
        },
      };
    }
    return { value: newValue };
  }, option);
}

/**
 * Validate not empty candidate
 * Error if candidate is undefined, null or NaN
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function NotEmpty(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateNotEmpty, "NotEmpty", option);
}

/**
 * Validate boolean candidate
 * Error if candidate is not a boolean type
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsBoolean(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateBoolean, "IsBoolean", option);
}

/**
 * Validate number candidate
 * Error if candidate is not a number type
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsNumber(option: INumberPropDecorationOption =
                             { message: "", required: false, min: undefined, max: undefined }) {
  const validate = (candidate: any): boolean => (
      validator.validateNumber(candidate)
      && (option.min ? candidate >= option.min : true)
      && (option.max ? candidate <= option.max : true)
  );
  return setterShortcut(validate, "IsNumber", option);
}

/**
 * Validate positive number candidate
 * Error if candidate is not a number type or not a positive number, include zero
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPositiveNumber(option: INumberPropDecorationOption =
                                     { message: "", required: false, min: undefined, max: undefined }) {
  const validate = (candidate: any): boolean =>
      validator.validatePositiveNumber(candidate)
      && (option.min ? candidate >= option.min : true)
      && (option.max ? candidate <= option.max : true);
  return setterShortcut(validate, "IsPositiveNumber", option);
}

/**
 * Validate positive or zero number candidate
 * Error if candidate is not a number type or not a positive number, except zero
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPositiveOrZeroNumber(option: INumberPropDecorationOption =
                                           { message: "", required: false, min: undefined, max: undefined }) {
  const validate = (candidate: any): boolean => (
      validator.validatePositiveOrZeroNumber(candidate)
      && (option.min ? candidate >= option.min : true)
      && (option.max ? candidate <= option.max : true)
  );
  return setterShortcut(validate, "IsPositiveOrZeroNumber", option);
}

/**
 * Validate not empty string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function NotEmptyString(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateNotEmptyString, "NotEmptyString", option);
}

/**
 * Validate array value
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsArray(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateArray, "IsArray", option);
}

/**
 * Validate email candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsEmail(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateEmail, "IsEmail", option);
}

/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPhone(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validatePhone, "IsPhone", option);
}

/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsMemberOf(option: IMemberOfPropDecorationOption = { message: "", array: [], required: false }) {
  const validate = (candidate: any) => validator.validateInclusive(candidate, option.array);
  return setterShortcut(validate, "IsMemberOf", option);
}
