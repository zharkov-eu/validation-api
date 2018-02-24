/*------------------------------------------------------------------------------
 -  Licensed under the MIT License. See License.txt in the project root for license information.
 -  @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

export interface ICause {
    constraint: string;
    message: string;
    property: string;
    value: any;
}

export class ValidationError extends Error {
    public cause: ICause[];

    constructor(cause: ICause[]) {
        super("Validation Error");
        this.cause = cause;
    }
}
