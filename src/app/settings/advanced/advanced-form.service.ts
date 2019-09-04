import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {StrainsFormService} from './setting-strains/strains-form.service';
import {RuleFormService} from './input-rule/rule-form.service';
import {isEqual} from 'lodash';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';

@Injectable({
  providedIn: 'root'
})
export class AdvancedFormService {
  public constructor(
    private formBuilder: FormBuilder,
    private strainsFormService: StrainsFormService,
    private ruleFormService: RuleFormService,
    private scrollToService: ScrollToService
  ) {
  }

  ChamberFormCrossValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const err = {};
    if (control.get('rules').value.length === 0) err['rules'] = {noRules: true};
    return isEqual(err, {}) ? null : err;
  };


  buildChamberForm(chamber?) {
    const chamberForm = this.formBuilder.group({
      _id: [],
      __v: [],
      name: [null, Validators.required],
      cycle: [null, Validators.required],
      strains: this.strainsFormService.createStrainsForms(),
      rules: this.ruleFormService.createRulesForms()
    });
    const strains = chamberForm.get('strains') as FormArray;
    if (chamber) {
      chamberForm.patchValue({
        _id: chamber._id,
        __v: chamber.__v,
        name: chamber.name,
        cycle: chamber.cycle,
        strains: [],
        rules: [],
      });
      chamber.strains.forEach((strain) => {
        const strainForm = this.strainsFormService.createStrainForms(strain);
        strains.push(strainForm);
      });
      this.strainsFormService.addStrain(strains);
      const rules = chamberForm.get('rules') as FormArray;
      if (chamber.rules) {
        chamber.rules.forEach((rule) => {
          const ruleForm = this.ruleFormService.createRuleForm(rule);
          rules.push(ruleForm);
        });
      }
    } else {
      this.strainsFormService.addStrain(strains);
    }
    return chamberForm;
  }

  buildChambersForm() {
    return this.formBuilder.group({
      chambers: this.formBuilder.array([])
    });
  }

  addChamber = (chambersForm, chamber?) => {
    const newChamberForm = this.buildChamberForm(chamber);
    chambersForm.get('chambers').push(newChamberForm);
    const config: ScrollToConfigOptions = {
      target: 'chamber' + chambersForm.get('chambers').value.length
    };
    this.scrollToService.scrollTo(config);

  };

}
