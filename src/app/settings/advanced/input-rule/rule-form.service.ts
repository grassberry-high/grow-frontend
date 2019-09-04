import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {get as _get, isEqual} from 'lodash';

const IntervalCrossValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  if (!control.touched) {
    return null;
  }
  const err = {};
  err['durationOn'] = Validators.required(control.get('durationOn'));
  err['timeUnit'] = Validators.required(control.get('timeUnit'));
  return isEqual(err, {durationOn: null, timeUnit: null}) ? null : {'intervalHelperErr': {required: true}};
};


@Injectable({
  providedIn: 'root'
})
export class RuleFormService {
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  setDurationMSOn(rule) {
    const durationHelper = rule.get('durationHelper').value;
    if (durationHelper.durationOn && durationHelper.timeUnit) {
      rule.get('durationMSOn').setValue(durationHelper.durationOn * durationHelper.timeUnit);
    }
  }

  ruleGetValidators(trigger, field) {
    const validators = [];
    if (!trigger) return validators;
    const triggerValidators = {
      timeOnOff: {
        startTime: Validators.required,
        durationHOn: Validators.required
      },
      interval: {
        onPattern: Validators.required,
        durationMSOn: Validators.required
      },
      thresholdOnOff: {
        onValue: Validators.required,
        offValue: Validators.required,
        forDetector: Validators.required,
        detectorId: Validators.required
      },
      thresholdOff: {
        offValue: Validators.required,
        forDetector: Validators.required,
        detectorId: Validators.required
      },
      thresholdTimer: {
        onValue: Validators.required,
        durationMSOn: Validators.required,
        forDetector: Validators.required,
        detectorId: Validators.required
      },
      thresholdBlock: {
        offValue: Validators.required,
        forDetector: Validators.required,
        detectorId: Validators.required
      },
    };
    return _get(triggerValidators, [null, trigger + '.' + field], []);
  }

  createRuleForm(rule?) {
    let trigger = null;
    if (rule && rule.trigger) {
      trigger = rule.trigger;
    }
    const ruleForm = this.formBuilder.group({
      _id: [],
      relay: [undefined, Validators.required],
      sensor: this.ruleGetValidators(trigger, 'sensor'),
      device: [undefined, Validators.required],
      forDetector: this.ruleGetValidators(trigger, 'forDetector'),
      detectorId: this.ruleGetValidators(trigger, 'detectorId'),
      trigger: [undefined, Validators.required],
      startTime: this.ruleGetValidators(trigger, 'startTime'),
      durationHOn: this.ruleGetValidators(trigger, 'durationHOn'),
      durationMSOn: this.ruleGetValidators(trigger, 'durationMSOn'),
      durationHelper: this.formBuilder.group({// helper is deleted in the backend
        durationOn: [],
        timeUnit: [],
      }, {validator: IntervalCrossValidation}),
      onValue: this.ruleGetValidators(trigger, 'onValue'),
      offValue: this.ruleGetValidators(trigger, 'offValue'),
      onPattern: this.ruleGetValidators(trigger, 'onPattern'),
      durationMBlocked: this.ruleGetValidators(trigger, 'durationMBlocked'),
      nightOff: this.ruleGetValidators(trigger, 'nightOff')
    });
    ruleForm.get('durationHelper').valueChanges.subscribe((change) => {
      this.setDurationMSOn(ruleForm);
    });
    if (rule) ruleForm.patchValue(rule);
    return ruleForm;
  }

  createRulesForms() {
    const rulesForm = this.formBuilder.array([], Validators.minLength(1));
    return rulesForm;
  }

}
