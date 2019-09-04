import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() {
  }

  /**
   * Go through all fields of a form and mark them dirty
   * @param formGroup: through all fields of this form group will be walked through
   */
  validateAllFormFields = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.controls.length; i++) {
          this.validateAllFormFields(control.controls[i] as FormGroup);
        }
      }
    });
  };
}
