import {Component, Input, OnInit} from '@angular/core';
import timeZoneOptions from './timezones.json';
import {ConfigService} from '../config/config.service';
import {RegionFormService} from './region-form.service';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-setting-region',
  templateUrl: './setting-region.component.html',
  styleUrls: ['./setting-region.component.scss']
})
export class SettingRegionComponent implements OnInit {
  @Input() region: any;
  datepickers = {
    dateTime: false
  };
  buttonDisabled = false;
  regionTimezoneOptions: any[] = [];
  regionOptions: any[];
  regionForm: FormGroup;

  constructor(
    private configService: ConfigService,
    private regionFormService: RegionFormService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.regionForm = this.regionFormService.createRegionForm();
    this.initTimeOptions();
    this.regionForm.get('region').valueChanges.subscribe((change) => {
      console.log(change);
      this.updateRegionTimezones();
    });
    this.regionForm.get('dateTime').valueChanges.subscribe((change) => {
      console.log(typeof change, JSON.stringify(change));
    });
  }

// -------------------------------- Init ----------------------------------------
  initTimeOptions(): void {
    this.regionOptions = timeZoneOptions.map((region) => {
      return region.group;
    });
    this.updateRegionTimezones();
  }

  // -------------------------------- Update region options ----------------------------------------
  updateRegionTimezones(): void {
    this.regionTimezoneOptions = timeZoneOptions.filter((region) => {
      return region.group === this.regionForm.get('region').value;
    }).map((region) => region.zones || [])[0];
  }

  // -------------------------------- SAVE ----------------------------------------
  configureDateTime(): void {
    if (!this.regionForm.valid) return;
    this.buttonDisabled = true;
    this.configService.configureDateTime(this.regionForm.value).subscribe((success) => {
      this.buttonDisabled = false;
      if (success) this.toastrService.success('Updated time zone', 'Your date/time information is now up-to-date');
    });
  }
}
