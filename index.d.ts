/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

/*----- Property decorators -----*/

export interface IPropDecoratorOption {
  group?: string[];
  message?: string;
}

export interface INumberPropDecorationOption extends IPropDecoratorOption {
  min?: number;
  max?: number;
}

export interface IMemberOfPropDecorationOption extends IPropDecoratorOption {
  array: any[];
}

/*----- Class decorators -----*/

export interface IValidateOption {
  group?: string;
}

/*----- Abstract class -----*/

export type TMessages = { [key: string]: string };

export abstract class AbstractValidated {
  public static setMessages(messages: TMessages);

  protected constructor(entity: any);
}

/*----- Validation error -----*/

export interface IValidationErrorCause {
  constraint: string;
  message: string;
  property?: string;
  value?: any;
}

export class ValidationError extends Error {
  public cause: IValidationErrorCause[];

  constructor(cause: IValidationErrorCause[]);
}

/*----- API -----*/

export declare const Validate: (option?: IValidateOption) => <T extends new(...args: any[]) => {}>(target: T) => any;
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
export declare const Required: (option?: IPropDecoratorOption) => any;
