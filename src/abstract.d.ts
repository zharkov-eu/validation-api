import { IValidationErrorCause } from "./error";
export declare abstract class AbstractValidated {
    abstract __validationError: () => IValidationErrorCause[];
    protected constructor(entity: any);
}
