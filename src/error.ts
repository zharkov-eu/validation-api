/*------------------------------------------------------------------------------
 -  Licensed under the MIT License. See License.txt in the project root for license information.
 -  @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

export interface IValidationErrorCause {
    constraint: string;
    message: string;
    property: string;
    value: any;
}

export class ValidationError extends Error {
    public cause: IValidationErrorCause[];

    constructor(cause: IValidationErrorCause[]) {
        super("Validation Error");
        this.cause = cause;
    }
}
