'use strict';

import { propDecorator } from './decorator';
import * as validator from './utils/validate';

export enum Constraint {
  IsArray = 'IsArray',
  IsBoolean = 'IsBoolean',
  IsEmail = 'IsEmail',
  IsMemberOf = 'IsMemberOf',
  IsNumber = 'IsNumber',
  IsPhone = 'IsPhone',
  IsPresented = 'IsPresented',
  IsPositiveNumber = 'IsPositiveNumber',
  IsPositiveOrZeroNumber = 'IsPositiveOrZeroNumber',
  IsString = 'IsString',
  NotEmpty = 'NotEmpty',
  NotEmptyString = 'NotEmptyString',
  Required = 'Required',
}

export interface IPropDecoratorOption {
  group?: string[];
  message?: string;
}

export interface INumberPropDecorationOption extends IPropDecoratorOption {
  min?: number;
  max?: number;
}

export interface IPhonePropDecorationOption extends IPropDecoratorOption {
  minlen?: number;
  maxlen?: number;
}

export interface IMemberOfPropDecorationOption extends IPropDecoratorOption {
  array: unknown[];
}

const defaultOption: IPropDecoratorOption = { message: '', group: [] };

function setterShortcut(
  validate: (value: unknown) => boolean,
  constraint: string,
  option: IPropDecoratorOption,
) {
  return propDecorator((value, propertyKey) => {
    if (value == null && constraint !== Constraint.Required) return;
    if (!validate(value))
      return {
        value,
        constraint,
        property: propertyKey,
        message: option.message || '{' + constraint + '}',
      };
  }, option.group);
}

/**
 * Custom validation annotation
 * @constructor
 */
export function Annotate(validate: (value: unknown) => boolean, constraint: string) {
  return (option: IPropDecoratorOption) => setterShortcut(validate, constraint, option);
}

/**
 * Validate not empty candidate
 * Error if candidate is undefined, null or NaN
 */
export function NotEmpty(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateNotEmpty, Constraint.NotEmpty, option);
}

/**
 * Validate boolean candidate
 * Error if candidate is not a boolean type
 */
export function IsBoolean(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateBoolean, Constraint.IsBoolean, option);
}

/**
 * Validate number candidate
 * Error if candidate is not a number type
 */
export function IsNumber(option: INumberPropDecorationOption = defaultOption) {
  const validate = (candidate: unknown): boolean =>
    validator.validateNumber(candidate) &&
    (option.min ? candidate >= option.min : true) &&
    (option.max ? candidate <= option.max : true);
  return setterShortcut(validate, Constraint.IsNumber, option);
}

/**
 * Validate positive number candidate
 * Error if candidate is not a number type or not a positive number, include zero
 */
export function IsPositiveNumber(option: INumberPropDecorationOption = defaultOption) {
  const validate = (candidate: unknown): boolean =>
    validator.validatePositiveNumber(candidate) &&
    (option.min ? candidate >= option.min : true) &&
    (option.max ? candidate <= option.max : true);
  return setterShortcut(validate, Constraint.IsPositiveNumber, option);
}

/**
 * Validate positive or zero number candidate
 * Error if candidate is not a number type or not a positive number, except zero
 */
export function IsPositiveOrZeroNumber(option: INumberPropDecorationOption = defaultOption) {
  const validate = (candidate: unknown): boolean =>
    validator.validatePositiveOrZeroNumber(candidate) &&
    (option.min ? candidate >= option.min : true) &&
    (option.max ? candidate <= option.max : true);
  return setterShortcut(validate, Constraint.IsPositiveOrZeroNumber, option);
}

/**
 * Validate string (typeof)
 */
export function IsString(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateString, Constraint.IsString, option);
}

/**
 * Validation of not empty string (typeof)
 */
export function NotEmptyString(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateNotEmptyString, Constraint.NotEmptyString, option);
}

/**
 * Validate array value (Array.isArray())
 */
export function IsArray(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateArray, Constraint.IsArray, option);
}

/**
 * Email validation (RegExp)
 */
export function IsEmail(option: IPropDecoratorOption = defaultOption) {
  return setterShortcut(validator.validateEmail, Constraint.IsEmail, option);
}

/**
 * Phone validation (RegExp)
 */
export function IsPhone(option: IPhonePropDecorationOption = defaultOption) {
  const validate = (candidate: unknown) =>
    validator.validatePhone(candidate, option.minlen, option.maxlen);
  return setterShortcut(validate, Constraint.IsPhone, option);
}

/**
 * Inclusive relation validation (indexOf)
 * Error if candidate is not exists in inclusive array
 */
export function IsMemberOf(
  option: IMemberOfPropDecorationOption = { ...defaultOption, array: [] },
) {
  const validate = (candidate: unknown) => validator.validateInclusive(candidate, option.array);
  return setterShortcut(validate, Constraint.IsMemberOf, option);
}

/**
 * Validate required
 * Error if candidate is undefined or null
 */
export function Required(option: IPropDecoratorOption = defaultOption) {
  const validate = (candidate: unknown) => candidate != null;
  return setterShortcut(validate, Constraint.Required, option);
}
