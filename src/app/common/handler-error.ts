import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "./models/errors.model";
import { FormGroup } from "@angular/forms";

export function handleServerErrors(error: HttpErrorResponse, form: FormGroup) {
  const problem: ProblemDetail = error.error
  if (problem.title === 'Bad Request') {
    for (const field of problem.fields) {
      if (form.contains(field.name)) {
        form.controls[field.name].setErrors({ serverError: field.error });
      }
    }
  } else {
    form.controls['email'].setErrors({ serverError: error.error.title });
  }
}
