import { IValidationErrorCause } from "../error";
import { IPropDecoratorOption } from "./api";
export declare const requiredContainer = "__requiredContainer";
export declare const errorContainer = "__errorContainer";
export interface IPropValidateResponse {
    error?: IValidationErrorCause;
    value?: any;
}
export declare function propDecorator(setter: (newValue: any, propertyKey: string | symbol) => IPropValidateResponse, option: IPropDecoratorOption): (target: any, propertyKey: string | symbol) => void;
export declare function Validate(): <T extends new (...args: any[]) => any>(target: T) => {
    new (...args: any[]): {
        [x: string]: any;
    };
} & T;
