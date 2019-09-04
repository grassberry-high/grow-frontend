import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {FormGroup} from '@angular/forms';
import {UnitFormService} from './unit-form.service';
import {ToastrService} from 'ngx-toastr';
import {SettingUnits} from '../../interfaces/settings-interfaces';

@Component({
  selector: 'app-setting-unit',
  templateUrl: './setting-unit.component.html',
  styleUrls: ['./setting-unit.component.scss']
})
export class SettingUnitComponent implements OnInit {
  @Input() units: SettingUnits;
  buttonDisabled = false;
  unitsForm: FormGroup;
  unitOptions = {temperature: [{key: 'celsius', label: 'Celsius'}, {key: 'fahrenheit', label: 'Fahrenheit'}]};

  constructor(
    private configService: ConfigService,
    private toastrService: ToastrService,
    private unitFormService: UnitFormService
  ) {
    this.unitsForm = unitFormService.createUnitForm();
  }

  // ------------------------------------ save ---------------------------------------
  configureUnits(): void {
    this.buttonDisabled = true;
    this.configService.updateSystemUnits(this.unitsForm.value).subscribe((success) => {
      this.buttonDisabled = false;
      if (success) this.toastrService.success('Updated system');
    });
  }

  ngOnInit() {
  }

}
