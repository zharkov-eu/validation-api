'use strict';

export interface IValidationErrorCause {
  constraint: string;
  message: string;
  property?: string;
  value?: any;
}

export class ValidationError extends Error {
  public cause: IValidationErrorCause[];

  constructor(cause: IValidationErrorCause[]) {
    super();
    this.cause = cause;
    this.name = 'ValidationError';
    this.message = cause.length ? cause[0].message : 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
