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

export enum Constraint {
  IsArray = "IsArray",
  IsBoolean = "IsBoolean",
  IsEmail = "IsEmail",
  IsMemberOf = "IsMemberOf",
  IsNumber = "IsNumber",
  IsPhone = "IsPhone",
  IsPositiveNumber = "IsPositiveNumber",
  IsPositiveOrZeroNumber = "IsPositiveOrZeroNumber",
  IsPresented = "IsPresented",
  IsString = "IsString",
  NotEmpty = "NotEmpty",
  NotEmptyString = "NotEmptyString",
  Required = "Required",
}

function setterShortcut(validate: (candidate: any) => boolean, constraint: Constraint, option: IPropDecoratorOption) {
  return propDecorator((newValue: any, propertyKey: string | symbol): IPropValidateResponse => {
    if (!validate(newValue)) {
      return {
        error: {
          constraint: constraint,
          message: option.message || propertyKey.toString() + " is invalid by " + constraint + " constraint",
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
  return setterShortcut(validator.validateNotEmpty, Constraint.NotEmpty, option);
}

/**
 * Validate boolean candidate
 * Error if candidate is not a boolean type
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsBoolean(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateBoolean, Constraint.IsBoolean, option);
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
  return setterShortcut(validate, Constraint.IsNumber, option);
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
  return setterShortcut(validate, Constraint.IsPositiveNumber, option);
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
  return setterShortcut(validate, Constraint.IsPositiveOrZeroNumber, option);
}

/**
 * Validate is string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsString(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateString, Constraint.IsString, option);
}

/**
 * Validate not empty string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function NotEmptyString(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateNotEmptyString, Constraint.NotEmptyString, option);
}

/**
 * Validate array value
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsArray(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateArray, Constraint.IsArray, option);
}

/**
 * Validate email candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsEmail(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validateEmail, Constraint.IsEmail, option);
}

/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsPhone(option: IPropDecoratorOption = { message: "", required: false }) {
  return setterShortcut(validator.validatePhone, Constraint.IsPhone, option);
}

/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export function IsMemberOf(option: IMemberOfPropDecorationOption = { message: "", array: [], required: false }) {
  const validate = (candidate: any) => validator.validateInclusive(candidate, option.array);
  return setterShortcut(validate, Constraint.IsMemberOf, option);
}
