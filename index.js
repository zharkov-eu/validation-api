/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

var api = require("./src/decorator/api");
var shared = require("./src/decorator/shared");
var error = require("./src/error");

exports.ValidationError = error.ValidationError;

function ValidationDomain() {
    this.__validationError = function () {
        return undefined;
    };
    return this;
}

exports.ValidationDomain = ValidationDomain;

exports.Validate = shared.Validate;
exports.NotEmpty = api.NotEmpty;
exports.IsBoolean = api.IsBoolean;
exports.IsNumber = api.IsNumber;
exports.IsPositiveNumber = api.IsPositiveNumber;
exports.IsPositiveOrZeroNumber = api.IsPositiveOrZeroNumber;
exports.NotEmptyString = api.NotEmptyString;
exports.IsEmail = api.IsEmail;
exports.IsPhone = api.IsPhone;
exports.IsMemberOf = api.IsMemberOf;
