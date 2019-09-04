import {Component, OnInit} from '@angular/core';
import {DeveloperService} from 'src/app/services/developer.service';
import {Sensor, System} from '../../interfaces/interfaces';
import {SystemService} from '../../services/system.service';
import {FormArray, FormGroup} from '@angular/forms';
import {SensorFormService} from './sensor-form.service';
import {SensorService} from '../../services/sensor.service';
import {DomSanitizer} from '@angular/platform-browser';
import {findIndex, omit} from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {FormHelperService} from '../../form-helper/form-helper.service';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  developmentMode: boolean;
  system: System;
  sensorsForm: FormGroup;
  buttonDisabled = false;
  addSensor: Function;
  validateAllFormFields: Function;
  units = {temperature: 'celsius'};
  technologyOptions = [
    {
      longName: 'I2C (Controll Everything)',
      shortName: 'i2c'
    },
    {
      longName: 'Bluetooth Low Energy',
      shortName: 'ble'
    }];
  modelOptions = {
    i2c: ['hdc1000', 'chirp', 'mhz16'],
    ble: ['sensorTag']
  };
  images = {
    hdc1000: 'hdc1000.png',
    chirp: 'chirp.png',
    mhz16: 'mhz16.png'
  };

  constructor(
    private developerService: DeveloperService,
    private formHelperService: FormHelperService,
    private hotkeysService: HotkeysService,
    private systemService: SystemService,
    private sensorService: SensorService,
    private sensorFormService: SensorFormService,
    private sanitizer: DomSanitizer,
    private toastrService: ToastrService
  ) {
    this.sensorsForm = this.sensorFormService.createSensorsForm();
    this.addSensor = this.sensorFormService.addSensor;
    this.validateAllFormFields = this.formHelperService.validateAllFormFields;
    developerService.developmentModeChange.subscribe((developmentMode) => {
      this.developmentMode = developmentMode;
    });
    systemService.systemChange.subscribe((system) => {
      if (system) {
        this.system = system;
        // this.system.units.temperature = $filter('unitFilter')('temperature', system.units.temperature) if system.units?
      }
    });
    sensorService.sensorsRawChanged.subscribe((sensorsRaw) => {
      this.sensorsForm = this.sensorFormService.createSensorsForm(sensorsRaw);
    });
    // ------------------------- hotkeys ----------------------------------------
    this.hotkeysService.add(new Hotkey('alt+d', (event: KeyboardEvent): boolean => {
      this.sensorFormService.addDummy(this.sensorsForm.get('sensors'));
      return false; // Prevent bubbling
    }, undefined, 'Add dummy.'));
  }

  ngOnInit() {
    this.sensorService.getSensorsRaw();
    this.systemService.getSystem();
  }

  get sensors() {
    return this.sensorsForm.get('sensors') as FormArray;
  }

  onSubmit(submitIndex) {
    const sensor = this.sensors[submitIndex];
    this.validateAllFormFields(sensor);
    if (sensor.valid) {
      this.upsertSensor(sensor);
    }
  }

  upsertSensor(sensor) {
    this.buttonDisabled = true;
    this.sensorService.upsertSensor(sensor.value).subscribe((success) => {
      this.buttonDisabled = false;
      if (success) this.toastrService.success('Created/Updated sensor');
    });
  }

  removeSensor(removeIndex) {
    const sensorId = this.sensors.controls[removeIndex].get('_id').value;
    if (sensorId) {
      this.sensorService.removeSensor(sensorId);
    } else {
      this.sensors.removeAt(removeIndex);
    }
  }

// ----------------------------------- Export/Import --------------------------------------------------
  exportSensorGetFile(sensor) {
    const sensorJson = JSON.stringify(omit(sensor, []), null, 4);
    return this.sanitizer.bypassSecurityTrustUrl('data:text/jsoncharset=UTF-8,' + encodeURIComponent(sensorJson));
  }

  exportSensorGetName(sensor) {
    let name = sensor.model + '.json';
    if (sensor && sensor._id) {
      name = sensor._id + '_' + sensor.name + '_' + sensor.model + '.json';
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
      if (error) return;
      let importedSensor: Sensor = {};
      try {
        importedSensor = JSON.parse((myReader.result as string));
      } catch (err) {
        this.toastrService.error(err || '', 'Could not Import Settings');
      }
      const importIndex = findIndex(this.sensors.value, {_id: importedSensor._id});
      if (importIndex !== -1) {
        this.sensors[importIndex].setValue(importedSensor);
        this.toastrService.success('Please review and save (substituted existing)', 'Imported Settings');
      } else {
        this.addSensor(this.sensors, importedSensor);
        this.toastrService.success('Please review and save (added new one)', 'Imported Settings');

      }
    };
    myReader.readAsText(file);
  }
}
