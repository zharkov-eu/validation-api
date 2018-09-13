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
/**
 * Validate not empty candidate
 * Error if candidate is undefined, null or NaN
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function NotEmpty(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate boolean candidate
 * Error if candidate is not a boolean type
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsBoolean(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate number candidate
 * Error if candidate is not a number type
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsNumber(option?: INumberPropDecorationOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate positive number candidate
 * Error if candidate is not a number type or not a positive number, include zero
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsPositiveNumber(option?: INumberPropDecorationOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate positive or zero number candidate
 * Error if candidate is not a number type or not a positive number, except zero
 * @param {IPropDecoratorOption} option - min / max parameters uses less/greater or equal comparison
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsPositiveOrZeroNumber(option?: INumberPropDecorationOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate is string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsString(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate not empty string candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function NotEmptyString(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate array value
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsArray(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate email candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsEmail(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsPhone(option?: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
/**
 * Validate phone candidate
 * @param {IPropDecoratorOption} option
 * @returns {(target: any, propertyKey: (string | symbol)) => void}
 * @constructor
 */
export declare function IsMemberOf(option?: IMemberOfPropDecorationOption): (target: any, propertyKey: string | symbol) => void;
