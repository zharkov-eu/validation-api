/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import { IMemberOfPropDecorationOption, INumberPropDecorationOption, IPropDecoratorOption } from "../index";
import { propDecorator } from "./utils/decorator";
import * as validator from "./utils/validate";

export enum Constraint {
  IsArray = "IsArray",
  IsBoolean = "IsBoolean",
  IsEmail = "IsEmail",
  IsMemberOf = "IsMemberOf",
  IsNumber = "IsNumber",
  IsPhone = "IsPhone",
  IsPresented = "IsPresented",
  IsPositiveNumber = "IsPositiveNumber",
  IsPositiveOrZeroNumber = "IsPositiveOrZeroNumber",
  IsString = "IsString",
  NotEmpty = "NotEmpty",
  NotEmptyString = "NotEmptyString",
  Required = "Required",
}

const defaultOption: IPropDecoratorOption = { message: "", group: [] };

function setterShortcut(validate: (value: any) => boolean, constraint: string, option: IPropDecoratorOption) {
  return propDecorator((value, propertyKey) => {
    if (value == null && constraint !== Constraint.Required)
      return;
    if (!validate(value)) return {
      value, constraint, property: propertyKey,
      message: option.message || "{" + constraint + "}",
    };
  }, option.group);
}

/**
 * Custom validation annotation
 * @param validate {(value: any) => boolean}
 * @param constraint {string}
 * @constructor
 */
export function Annotate(validate: (value: any) => boolean, constraint: string) {
  return (option: IPropDecoratorOption) => setterShortcut(validate, constraint, option);
}

/**
 * Validate not empty candidate
 * Error if candidate is undefined, null or NaN
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function NotEmpty(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateNotEmpty, Constraint.NotEmpty, option);
}

/**
 * Validate boolean candidate
 * Error if candidate is not a boolean type
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsBoolean(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateBoolean, Constraint.IsBoolean, option);
}

/**
 * Validate number candidate
 * Error if candidate is not a number type
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsNumber(option: INumberPropDecorationOption = defaultOption) {
  const validate = (candidate: any): boolean => (
    validator.validateNumber(candidate)
    && (option.min ? candidate >= option.min : true)
    && (option.max ? candidate <= option.max : true)
  );
  return setterShortcut(validate, Constraint.IsNumber, option);
}

/**
 * Validate positive number candidate
 * Error if candidate is not a number type or not a positive number, include zero
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPositiveNumber(option: INumberPropDecorationOption = defaultOption) {
  const validate = (candidate: any): boolean =>
    validator.validatePositiveNumber(candidate)
    && (option.min ? candidate >= option.min : true)
    && (option.max ? candidate <= option.max : true);
  return setterShortcut(validate, Constraint.IsPositiveNumber, option);
}

/**
 * Validate positive or zero number candidate
 * Error if candidate is not a number type or not a positive number, except zero
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPositiveOrZeroNumber(option: INumberPropDecorationOption = defaultOption) {
  const validate = (candidate: any): boolean => (
    validator.validatePositiveOrZeroNumber(candidate)
    && (option.min ? candidate >= option.min : true)
    && (option.max ? candidate <= option.max : true)
  );
  return setterShortcut(validate, Constraint.IsPositiveOrZeroNumber, option);
}

/**
 * Validate is string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsString(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateString, Constraint.IsString, option);
}

/**
 * Validate not empty string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function NotEmptyString(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateNotEmptyString, Constraint.NotEmptyString, option);
}

/**
 * Validate array value
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsArray(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateArray, Constraint.IsArray, option);
}

/**
 * Validate email candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsEmail(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateEmail, Constraint.IsEmail, option);
}

/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPhone(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validatePhone, Constraint.IsPhone, option);
}

/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsMemberOf(option: IMemberOfPropDecorationOption = { ...defaultOption, array: [] }) {
  const validate = (candidate: any) => validator.validateInclusive(candidate, option.array);
  return setterShortcut(validate, Constraint.IsMemberOf, option);
}

/**
 * Validate required
 * False if candidate is undefined or null
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function Required(option: IPropDecoratorOption = defaultOption) {
  const validate = (candidate: any) => candidate != null;
  return setterShortcut(validate, Constraint.Required, option);
}
