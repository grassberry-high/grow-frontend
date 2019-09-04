import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {findIndex} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StrainsFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  createStrainForms(strain?) {
    const strainForm = this.formBuilder.group({
      name: [null, Validators.required],
      daysToHarvest: [],
    });
    if (strain) strainForm.patchValue(strain);
    return strainForm;
  }

  createStrainsForms() {
    const strainsForm = this.formBuilder.array([], Validators.minLength(1));
    strainsForm.valueChanges.subscribe((change: any) => {
      this.clearEmpty(strainsForm.get('strains'));
      if (change.strains && change.strains.length > 0 && change.strains[change.strains.length - 1].name !== null) {
        this.addStrain(strainsForm.get('strains'));
      }
    });
    return strainsForm;
  }

  // ------------------------------- add & remove strains ------------------------------
  addStrain(strains): void {
    const newStrain = this.formBuilder.group({'name': null, 'daysToHarvest': null});
    strains.push(newStrain);
  }

  // ------------------------------- Helper------------------------------
  clearEmpty(strains): void {
    if (strains && strains.length > 1) {
      const index = findIndex(strains.value, (strain) => {
        console.log(strain, strain.name === '');
        return (strain.name === '');
      });
      console.log('index', index);
      if (index !== -1) this.removeStrain(strains, index);
    }
  }

  removeStrain(strains, index): void {
    if (strains.length > 1) strains.removeAt(index);
  }

}
