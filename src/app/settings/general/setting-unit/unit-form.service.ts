import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UnitFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  createUnitForm(unit?) {
    const unitForm = this.formBuilder.group({
      temperature: [null, Validators.required]
    });
    if (unit) unitForm.patchValue(unit);
    return unitForm;
  }
}
