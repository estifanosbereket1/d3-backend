import { ValidationError } from 'class-validator';

export function mapValidationError(errors: ValidationError[]) {
    const errorsObject = {};

    for (const error of errors) {
        if (!(error.children && error.children.length)) {
            errorsObject[error['property']] = error.constraints ? Object.values(error.constraints) : [];
            continue;
        }

        errorsObject[error['property']] = mapValidationError(error['children']);
    }

    return errorsObject;
}
