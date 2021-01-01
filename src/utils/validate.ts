/**
 * Validate boolean value (typeof)
 */
export function validateBoolean(candidate: unknown): candidate is boolean {
  return typeof candidate === 'boolean';
}

/**
 * Validate number value (typeof)
 */
export function validateNumber(candidate: unknown): candidate is number {
  return typeof candidate === 'number';
}

/**
 * Validate positive number value (typeof)
 * Zero argument returns false
 */
export function validatePositiveNumber(candidate: unknown): candidate is number {
  return validateNumber(candidate) && candidate > 0;
}

/**
 * Validate positive or zero number value (typeof)
 * Zero argument return true
 */
export function validatePositiveOrZeroNumber(candidate: unknown): candidate is number {
  return validateNumber(candidate) && candidate >= 0;
}

/**
 * Validate not empty candidate (===, isNaN)
 * Return false if candidate is undefined, null or
 * Not NaN if Number
 * Not empty array if Array
 */
export function validateNotEmpty(candidate: unknown): boolean {
  return (
    candidate !== undefined &&
    candidate !== null &&
    (typeof candidate === 'number' ? !isNaN(candidate) : true) &&
    (Array.isArray(candidate) ? candidate.length > 0 : true)
  );
}

/**
 * Validate string (typeof)
 */
export function validateString(candidate: unknown): candidate is string {
  return typeof candidate === 'string';
}

/**
 * Validation of not empty string (typeof)
 */
export function validateNotEmptyString(candidate: unknown): candidate is string {
  return validateString(candidate) && candidate.trim().length > 0;
}

/**
 * Validate array value (Array.isArray())
 */
export function validateArray(candidate: unknown): candidate is unknown[] {
  return Array.isArray(candidate);
}

/**
 * Email validation (RegExp)
 */
export function validateEmail(candidate: unknown): candidate is string {
  const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validateNotEmptyString(candidate) && re.test(candidate);
}

/**
 * Phone validation (RegExp)
 */
export function validatePhone(candidate: unknown, minlen = 10, maxlen = 14): candidate is string {
  const count = minlen === maxlen ? minlen : minlen + ',' + maxlen;
  const re: RegExp = new RegExp('^(\\s*)?(\\+)?([- _():=+]?\\d[- _():=+]?){' + count + '}(\\s*)?$');
  return validateNotEmptyString(candidate) && re.test(candidate);
}

/**
 * Inclusive relation validation (indexOf)
 * Return true if candidate exists in inclusive array
 */
export function validateInclusive(candidate: unknown, inclusive: unknown[]) {
  return inclusive.indexOf(candidate) !== -1;
}
