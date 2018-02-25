/*------------------------------------------------------------------------------
 -  Licensed under the MIT License. See License.txt in the project root for license information.
 -  @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

import * as api from "./src/decorator/api";
import * as error from "./src/error";

export const ValidationError = error.ValidationError;
export class ValidationDomain {
  // noinspection TsLint
  public __validationError: () => error.IValidationErrorCause[] | undefined = () => undefined;
}

export const Validate = api.Validate;
export const NotEmpty = api.NotEmpty;
export const IsBoolean = api.IsBoolean;
export const IsNumber = api.IsNumber;
export const IsPositiveNumber = api.IsPositiveNumber;
export const IsPositiveOrZeroNumber = api.IsPositiveOrZeroNumber;
export const NotEmptyString = api.NotEmptyString;
export const IsEmail = api.IsEmail;
export const IsPhone = api.IsPhone;
