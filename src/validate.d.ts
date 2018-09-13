/**
 * Validate boolean value (typeof)
 * @param candidate
 * @returns {boolean}
 */
export declare function validateBoolean(candidate: any): boolean;
/**
 * Validate number value (typeof)
 * @param candidate
 * @returns {boolean}
 */
export declare function validateNumber(candidate: any): boolean;
/**
 * Validate positive number value (typeof)
 * Zero argument returns false
 * @param candidate
 * @returns {boolean}
 */
export declare function validatePositiveNumber(candidate: any): boolean;
/**
 * Validate positive or zero number value (typeof)
 * Zero argument return true
 * @param candidate
 * @returns {boolean}
 */
export declare function validatePositiveOrZeroNumber(candidate: any): boolean;
/**
 * Validate not empty candidate (===, isNaN)
 * Return false if candidate is undefined, null or
 * Not NaN if Number
 * Not empty array if Array
 * @param candidate
 * @returns {boolean}
 */
export declare function validateNotEmpty(candidate: any): boolean;
/**
 * Validate string (typeof)
 * @param candidate
 * @returns {boolean}
 */
export declare function validateString(candidate: any): boolean;
/**
 * Validation of not empty string (typeof)
 * @param candidate
 * @returns {boolean}
 */
export declare function validateNotEmptyString(candidate: any): boolean;
/**
 * Validate array value (Array.isArray())
 * @param candidate
 * @returns {boolean}
 */
export declare function validateArray(candidate: any): boolean;
/**
 * Email validation (RegExp)
 * @param candidate
 * @returns {boolean}
 */
export declare function validateEmail(candidate: any): boolean;
/**
 * Phone validation (RegExp)
 * @param candidate
 * @returns {boolean}
 */
export declare function validatePhone(candidate: any): boolean;
/**
 * Inclusive relation validation (indexof)
 * Return true if candidate
 * @param candidate
 * @param {Array} inclusive
 * @returns {boolean}
 */
export declare function validateInclusive(candidate: any, inclusive: any[]): boolean;
