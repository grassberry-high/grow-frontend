import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {findIndex, omit} from 'lodash';

import {Chamber, System} from 'src/app/interfaces/interfaces';
import * as advancedTutorialJson from 'src/app/settings/advanced/advanced-tutorial.json';
import {ChamberService} from 'src/app/services/chamber.service';
import {SensorService} from 'src/app/services/sensor.service';
import {RuleService} from 'src/app/services/rule.service';
import {SettingService} from 'src/app/services/setting.service';
import {SystemService} from 'src/app/services/system.service';
import {DeveloperService} from 'src/app/services/developer.service';

import {UnitPipe} from 'src/app/pipes/unit.pipe';
import {RelayPipe} from 'src/app/pipes/relay.pipe';
import {FormArray, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {AdvancedFormService} from './advanced-form.service';
import {FormHelperService} from '../../form-helper/form-helper.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  providers: [ChamberService, SensorService, RuleService, SettingService, SystemService, UnitPipe, RelayPipe],
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
// =============================== variables ================================
  chambersForm: FormGroup;
  developmentMode: boolean;
  activeDevices: any[] = [];
  system: System;
  buttonDisabled = false;
  ChamberFormCrossValidation: ValidatorFn;
  validateAllFormFields: Function;

  cycleOptions: CycleOption[] = [
    {id: 'mother', name: 'Mother/Clone'},
    {id: 'vegetation', name: 'Vegetation'},
    {id: 'bloom', name: 'Bloom'}, {id: 'drying', name: 'Drying'}
  ];
  conditionOptions: object[] = [
    {label: 'goes above value (>)', rule: 'above'},
    {label: 'goes below value (<)', above: 'below'}
  ];
  units: object = {temperature: 'celsius'};
  tutorialTexts: string[];
  addChamber: Function;

// =============================== constructor ================================
  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private hotkeysService: HotkeysService,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService,
    private advancedFormService: AdvancedFormService,
    private chamberService: ChamberService,
    private sensorService: SensorService,
    private ruleService: RuleService,
    private settingService: SettingService,
    private systemService: SystemService,
    private developerService: DeveloperService,
    private unitPipe: UnitPipe,
    private relayPipe: RelayPipe,
    private formHelperService: FormHelperService
  ) {
    this.chambersForm = this.advancedFormService.buildChambersForm();
    this.addChamber = this.advancedFormService.addChamber;
    this.ChamberFormCrossValidation = this.advancedFormService.ChamberFormCrossValidation;
    this.validateAllFormFields = this.formHelperService.validateAllFormFields;
    this.developmentMode = developerService.getDeveloperMode();
    developerService.developmentModeChange.subscribe((developmentMode) => {
      this.developmentMode = developmentMode;
    });
    this.systemService.systemChange.subscribe((system: System) => {
      if (system) {
        this.system = system;
        if (system.units) {
          this.system.units.temperature = this.unitPipe.transform('temperature', system.units.temperature);
        }
      }
    });
    // ------------------------- hotkeys ----------------------------------------
    this.hotkeysService.add(new Hotkey('alt+d', (event: KeyboardEvent): boolean => {
      if (this.chambers.controls[0]) {
        this.chamberService.fillChamberWithDummy(this.chambers, 0);
      }
      return false; // Prevent bubbling
    }, undefined, 'Fill with dummy.'));
  }

// =============================== init function ================================
  ngOnInit() {
    // -------------------------------- tutorial --------------------------------
    this.tutorialTexts = advancedTutorialJson.default.texts;

    // ------------------------------- Load chamber -----------------------------
    this.getChambers();
    this.settingService.getActiveDevices().subscribe((activeDevices: any[]) => {
      // console.log("activeDevices", activeDevices)
      this.activeDevices = activeDevices;
    });

    // ------------------------------- Load system info -----------------------------
    this.systemService.getSystem();
  }

// ------------------------------- forms ----------------------------------
  get chambers() {
    return this.chambersForm.get('chambers') as FormArray;
  }


// =============================== crud ================================
  // ------------------------------- Chamber------------------------------
  getChambers(): void {
    this.chamberService.getChambers().subscribe(chambersBE => {
      if (chambersBE.length === 0) {
        this.addChamber(this.chambersForm);
      } else {
        chambersBE.forEach((chamber) => {
          this.addChamber(this.chambersForm, chamber);
        });
      }
    });
  }

  onSubmit(index) {
    const chambers = this.chambersForm.get('chambers') as FormArray;
    const chamber = chambers.controls[index];
    this.validateAllFormFields(chamber);
    const crossValidationErr = this.ChamberFormCrossValidation(chamber);
    chamber.setErrors(crossValidationErr);
    if (chamber.valid) {
      console.info(chamber);
      this.upsertChamber(chamber);
    }
  }

  upsertChamber(chamberToSave): void {
    this.chamberService.upsertChamber(chamberToSave).subscribe((success: boolean) => {
      if (success === true) {
        this.getChambers();
      }
    });
  }

// #----------------------------------- Export/Import --------------------------

  exportChamberGetFile(chamber) {
    const chamberValue = chamber.value;
    chamberValue.strains = chamberValue.strains.filter(strain => strain.name !== null);
    const chamberJson = JSON.stringify(omit(chamberValue, ['activeSensors', 'allRelays']), null, 4);
    return this.sanitizer.bypassSecurityTrustUrl('data:text/jsoncharset=UTF-8,' + encodeURIComponent(chamberJson));
  }

  exportChamberGetName(chamber) {
    let name = 'settings.json';
    if (chamber && chamber._id) {
      name = chamber._id + '_' + name;
    }
    return name;
  }

  fileChanged($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (error) => {
      let importedChamber: Chamber = {};
      try {
        // console.log(myReader.result)
        importedChamber = JSON.parse((myReader.result as string));
        this.toastrService.success('Please review and save!', 'Imported Settings');
      } catch (err) {
        this.toastrService.error(err, 'Could not Import Settings');
      }

      const index = findIndex(this.chambers, {_id: importedChamber._id});
      this.addChamber(this.chambersForm, importedChamber);
      // TODO: redo with replacement
      // if (index !== -1) {
      //   this.chambers[index].setValue(importedChamber)
      // } else {
      //   this.chambers.push(this.formBuilder.group(importedChamber))
      // }
    };
    myReader.readAsText(file);
  }
}

interface CycleOption {
  id: string,
  name: string
}
