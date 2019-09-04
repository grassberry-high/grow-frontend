import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {StrainsFormService} from './strains-form.service';

@Component({
  selector: 'app-setting-strains',
  templateUrl: './setting-strains.component.html',
  styleUrls: ['./setting-strains.component.scss']
})
export class SettingStrainsComponent implements OnInit {
  @Input() chamberForm: FormGroup;
  @Input() chamberCycle: string;

  public constructor(
    private strainsFormService: StrainsFormService,
  ) {
  }

  ngOnInit() {
  }

  // ------------------------------- Form------------------------------
  get strains() {
    return this.chamberForm.get('strains') as FormArray;
  }

  get cycle() {
    return this.chamberForm.get('cycle').value as string;
  }

  // ------------------------------- Helper------------------------------
  clearEmpty(): void {
    this.strainsFormService.clearEmpty(this.strains);
  }

  // ------------------------------- add & remove strains ------------------------------
  addStrain(): void {
    this.strainsFormService.addStrain(this.strains);
  }

  removeStrain(index): void {
    this.strainsFormService.removeStrain(this.strains, index);
  }
}
