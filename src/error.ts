/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

import { IValidationErrorCause, ValidationError as Reference } from "../index";

export class ValidationError extends Error implements Reference {
  public cause: IValidationErrorCause[];

  constructor(cause: IValidationErrorCause[]) {
    super();
    this.cause = cause;
    this.name = "ValidationError";
    this.message = cause.length ? cause[0].message : "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
