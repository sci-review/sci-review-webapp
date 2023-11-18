import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "./models/errors.model";
import { FormGroup } from "@angular/forms";

export function handleServerErrors(error: HttpErrorResponse, form: FormGroup) {
  const problem: ProblemDetail = error.error
  if (problem.title === 'Bad Request') {
    for (const field of problem.fields) {
      if (form.contains(field.name)) {
        // reset the field value to its current value to trigger a change detection cycle
        form.controls[field.name].reset(form.controls[field.name].value);
        form.controls[field.name].setErrors({ serverError: field.error });
      }
    }
  } else {
    //get first form control and set error
    form.controls[Object.keys(form.controls)[0]].setErrors({ serverError: error.error.title });
  }
}
