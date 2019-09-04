import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {isEqual} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormService {
  urlRegex = /^(https?:\/\/)?(.*)\.(\w{1,})(:\d*)?(\/.*)?/i;

  public constructor(
    private formBuilder: FormBuilder
  ) {
  }

  feedbackFormCrossValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const err = {};
    if (control.get('type').value === 'Blog') {
      if (!control.get('url').value) err['url'] = {required: true};
      else if (!this.urlRegex.test(control.get('url').value)) err['url'] = {pattern: true};
    } else {
      if (control.get('description').value.length < 12) err['description'] = {minLength: true};
    }
    return isEqual(err, {}) ? null : err;
  };

  buildFeedbackForm() {
    return this.formBuilder.group({
      date: [null, Validators.required],
      type: [null, Validators.required],
      mood: ['neutral', Validators.required],
      url: [null],
      description: [null]
    }, {validators: this.feedbackFormCrossValidation});
  }
}
