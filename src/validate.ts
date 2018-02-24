/*------------------------------------------------------------------------------
 - Licensed under the MIT License. See License.txt in the project root for license information.
 - @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 -----------------------------------------------------------------------------*/

"use strict";

export function validateBoolean(candidate: any): boolean {
    return typeof candidate === "boolean";
}

export function validateNumber(candidate: any): boolean {
    return typeof candidate === "number";
}

export function validatePositiveNumber(candidate: any): boolean {
    return validateNumber(candidate) && candidate  > 0;
}

export function validatePositiveOrZeroNumber(candidate: any): boolean {
    return validateNumber(candidate) && candidate >= 0;
}

export function validateNotEmpty(candidate: any): boolean {
    return candidate !== undefined && candidate !== null && !isNaN(candidate);
}

export function validateNotEmptyString(candidate: any): boolean {
    return typeof candidate === "string" && candidate.length > 0;
}
