/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

import * as api from "./src/decorator/api";
import * as shared from "./src/decorator/shared";
import * as error from "./src/error";

export class ValidationError extends error.ValidationError {}
export interface IValidationErrorCause extends error.IValidationErrorCause {}

export declare class ValidationDomain {
  __validationError: () => IValidationErrorCause[] | undefined;
}
export declare const Validate: typeof shared.Validate;
export declare const NotEmpty: typeof api.NotEmpty;
export declare const IsBoolean: typeof api.IsBoolean;
export declare const IsNumber: typeof api.IsNumber;
export declare const IsPositiveNumber: typeof api.IsPositiveNumber;
export declare const IsPositiveOrZeroNumber: typeof api.IsPositiveOrZeroNumber;
export declare const NotEmptyString: typeof api.NotEmptyString;
export declare const IsEmail: typeof api.IsEmail;
export declare const IsPhone: typeof api.IsPhone;
export declare const IsMemberOf: typeof api.IsMemberOf;
