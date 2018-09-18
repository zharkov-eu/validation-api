export interface IValidationErrorCause {
    constraint: string;
    message: string;
    property: string;
    value: any;
}
export declare class ValidationError extends Error {
    cause: IValidationErrorCause[];
    message: string;
    constructor(cause: IValidationErrorCause[]);
}
