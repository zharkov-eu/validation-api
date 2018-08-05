/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

export interface IValidationErrorCause {
  constraint: string;
  message: string;
  property: string;
  value: any;
}

export class ValidationError extends Error {
  public cause: IValidationErrorCause[];
  public message: string;

  constructor(cause: IValidationErrorCause[]) {
    super();
    this.cause = cause;
    this.message = cause.length ? cause[0].message : "Validation error";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
