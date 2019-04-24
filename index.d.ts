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

export interface IPhonePropDecorationOption extends IPropDecoratorOption {
  minlen?: number;
  maxlen?: number;
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
  public static setMessages(messages: TMessages): void;

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

export type PropAnnotation = (target: object, propertyKey: string) => void;

export declare const Validate: (option?: IValidateOption) => <T extends new(...args: any[]) => {}>(target: T) => any;
export declare const NotEmpty: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const IsBoolean: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const IsNumber: (option?: INumberPropDecorationOption) => PropAnnotation;
export declare const IsPositiveNumber: (option?: INumberPropDecorationOption) => PropAnnotation;
export declare const IsPositiveOrZeroNumber: (option?: INumberPropDecorationOption) => PropAnnotation;
export declare const IsString: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const NotEmptyString: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const IsArray: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const IsEmail: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const IsPhone: (option?: IPhonePropDecorationOption) => PropAnnotation;
export declare const IsMemberOf: (option?: IMemberOfPropDecorationOption) => PropAnnotation;
export declare const Required: (option?: IPropDecoratorOption) => PropAnnotation;
export declare const Annotate: (validate: (value: any) => boolean, constraint: string) =>
  (option?: IPropDecoratorOption) => PropAnnotation;
