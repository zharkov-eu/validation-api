import { IValidationErrorCause } from "../error";
import { IPropDecoratorOption } from "./api";
export declare const requiredContainer = "__requiredContainer";
export declare const errorContainer = "__errorContainer";
export interface IClassDecoratorOption {
    throwable?: boolean;
}
export interface IPropValidateResponse {
    error?: IValidationErrorCause;
    value?: any;
}
export declare function propDecorator(setter: (newValue: any, propertyKey: string | symbol) => IPropValidateResponse, option: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
export declare function Validate(option?: IClassDecoratorOption): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {};
} & T;
