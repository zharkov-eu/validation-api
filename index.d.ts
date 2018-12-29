/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

import * as abstract from "./src/abstract";
import * as api from "./src/decorator/api";
import { Constraint } from "./src/decorator/api";
import * as error from "./src/error";

interface IPropDecoratorOption extends api.IPropDecoratorOption {
  message?: string;
  required?: boolean;
}

interface INumberPropDecorationOption extends IPropDecoratorOption, api.INumberPropDecorationOption {
  min?: number;
  max?: number;
}

interface IMemberOfPropDecorationOption extends IPropDecoratorOption, api.IMemberOfPropDecorationOption {
  array: any[];
}

export abstract class AbstractValidated extends abstract.AbstractValidated {
  protected constructor(entity: any);
}

export class ValidationError extends error.ValidationError {
  public cause: IValidationErrorCause[];

  constructor(cause: IValidationErrorCause[]);
}

export interface IValidationErrorCause extends error.IValidationErrorCause {
  constraint: Constraint;
  message: string;
  property: string;
  value: any;
}

// tslint:disable-next-line:max-line-length
export declare const Validate: () => <T extends new(...args: any[]) => {}>(target: T) => any;
export declare const NotEmpty: (option?: IPropDecoratorOption) => any;
export declare const IsBoolean: (option?: IPropDecoratorOption) => any;
export declare const IsNumber: (option?: INumberPropDecorationOption) => any;
export declare const IsPositiveNumber: (option?: INumberPropDecorationOption) => any;
export declare const IsPositiveOrZeroNumber: (option?: INumberPropDecorationOption) => any;
export declare const IsString: (option?: IPropDecoratorOption) => any;
export declare const NotEmptyString: (option?: IPropDecoratorOption) => any;
export declare const IsArray: (option?: IPropDecoratorOption) => any;
export declare const IsEmail: (option?: IPropDecoratorOption) => any;
export declare const IsPhone: (option?: IPropDecoratorOption) => any;
export declare const IsMemberOf: (option?: IMemberOfPropDecorationOption) => any;
