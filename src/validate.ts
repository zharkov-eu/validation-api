/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

/**
 * Validate boolean value (typeof)
 * @param candidate
 * @returns {boolean}
 */
export function validateBoolean(candidate: any): boolean {
  return typeof candidate === "boolean";
}

/**
 * Validate number value (typeof)
 * @param candidate
 * @returns {boolean}
 */
export function validateNumber(candidate: any): boolean {
  return typeof candidate === "number";
}

/**
 * Validate positive number value (typeof)
 * Zero argument returns false
 * @param candidate
 * @returns {boolean}
 */
export function validatePositiveNumber(candidate: any): boolean {
  return validateNumber(candidate) && candidate > 0;
}

/**
 * Validate positive or zero number value (typeof)
 * Zero argument return true
 * @param candidate
 * @returns {boolean}
 */
export function validatePositiveOrZeroNumber(candidate: any): boolean {
  return validateNumber(candidate) && candidate >= 0;
}

/**
 * Validate not empty candidate (===, isNaN)
 * Return false if candidate is undefined, null or NaN
 * @param candidate
 * @returns {boolean}
 */
export function validateNotEmpty(candidate: any): boolean {
  return candidate !== undefined && candidate !== null && !isNaN(candidate);
}

/**
 * Validation of not empty string (typeof)
 * @param candidate
 * @returns {boolean}
 */
export function validateNotEmptyString(candidate: any): boolean {
  return typeof candidate === "string" && candidate.length > 0;
}

/**
 * Email validation (RegExp)
 * @param candidate
 * @returns {boolean}
 */
export function validateEmail(candidate: any): boolean {
  // tslint:disable-next-line:max-line-length
  const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validateNotEmptyString(candidate) && re.test(candidate);
}

/**
 * Phone validation (RegExp)
 * @param candidate
 * @returns {boolean}
 */
export function validatePhone(candidate: any): boolean {
  const re: RegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return validateNotEmptyString(candidate) && re.test(candidate);
}

/**
 * Inclusive relation validation (indexof)
 * Return true if candidate
 * @param candidate
 * @param {Array} inclusive
 * @returns {boolean}
 */
export function validateInclusive(candidate: any, inclusive: any[]) {
  return inclusive.indexOf(candidate) !== -1;
}
