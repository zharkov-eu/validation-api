import { Constraint } from "./decorator/api";
export interface IValidationErrorCause {
    constraint: Constraint;
    message: string;
    property: string;
    value: any;
}
export declare class ValidationError extends Error {
    cause: IValidationErrorCause[];
    message: string;
    constructor(cause: IValidationErrorCause[]);
}
