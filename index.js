/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

var AbstractValidated = require("./src/abstract").AbstractValidated;
var ValidationError = require("./src/error").ValidationError;
var Validate = require("./src/utils/decorator").Validate;
var Api = require("./src/api");

exports.AbstractValidated = AbstractValidated;
exports.ValidationError = ValidationError;
exports.Validate = Validate;

exports.NotEmpty = Api.NotEmpty;
exports.IsBoolean = Api.IsBoolean;
exports.IsNumber = Api.IsNumber;
exports.IsPositiveNumber = Api.IsPositiveNumber;
exports.IsPositiveOrZeroNumber = Api.IsPositiveOrZeroNumber;
exports.IsString = Api.IsString;
exports.NotEmptyString = Api.NotEmptyString;
exports.IsArray = Api.IsArray;
exports.IsEmail = Api.IsEmail;
exports.IsPhone = Api.IsPhone;
exports.IsMemberOf = Api.IsMemberOf;
