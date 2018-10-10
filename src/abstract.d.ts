import { IValidationErrorCause } from "./error";
export declare abstract class AbstractValidated {
    __validationError: () => IValidationErrorCause[];
    protected constructor(entity: any);
}
