import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import * as moment from 'moment';
import {isEqual} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RegionFormService {
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  DateValidaton: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const err: any = {};
    if (!control.value) err.required = true;
    if (!moment(control.value).isValid()) err.invalidDate = true;
    return isEqual(err, {}) ? null : err;
  };

  createRegionForm(region?) {
    const regionForm = this.formBuilder.group({
      region: [null, Validators.required],
      timeZone: [null, Validators.required],
      dateTime: [null, this.DateValidaton]
    });
    if (region) regionForm.patchValue(region);
    return regionForm;
  }
}
