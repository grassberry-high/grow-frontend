import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {isEqual, omit} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SensorFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  SensorFormCrossValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const err: any = {};
    switch (control.get('technology').value) {
      case 'i2c':
        if (!control.get('address').value) err.i2c = {required: true};
        break;
      case 'ble':
        if (!control.get('uuid').value) err.uuid = {required: true};
        break;
    }
    return isEqual(err, {}) ? null : err;
  };

  createDetectorForm(detector?): FormGroup {
    const detectorForm = this.formBuilder.group({
      type: [null, Validators.required],
      name: [null, [Validators.required, Validators.minLength(3)]],
      unit: [null, Validators.required]
    });
    if (detector) {
      detectorForm.patchValue({
        type: detector.type,
        name: detector.name,
        unit: detector.unit
      });
    }
    return detectorForm;
  }

  createSensorForm(sensor?): FormGroup {
    const sensorForm = this.formBuilder.group({
      _id: [null],
      technology: [null, Validators.required],
      model: [null, Validators.required],
      uuid: [null],
      address: [null, Validators.pattern('\d*')],
      detectors: this.formBuilder.array([], Validators.minLength(1))
    }, {validators: [this.SensorFormCrossValidation]});
    if (sensor) sensorForm.patchValue(omit(sensor, 'detectors'));
    if (sensor.detectors) {
      sensor.detectors.forEach((detector) => {
        (<FormArray>sensorForm.get('detectors')).push(this.createDetectorForm(detector));
      });
    } else {
      (<FormArray>sensorForm.get('detectors')).push(this.createDetectorForm());
    }
    sensorForm.get('model').valueChanges.subscribe(() => {
      this.addDetectors(sensorForm);
    });
    return sensorForm;
  }

  createSensorsForm(sensors?): FormGroup {
    const sensorsForm = this.formBuilder.group({
      sensors: this.formBuilder.array([], Validators.minLength(1))
    });
    if (sensors) {
      sensors.forEach((sensor) => {
        (<FormArray>sensorsForm.get('sensors')).push(this.createSensorForm(sensor));
      });
    }
    return sensorsForm;
  }

  // ------------------------------- add & remove sensors & detectors------------------------------
  addDetectors(sensorForm) {
    switch (sensorForm.get('model').value) {
      case 'hdc1000':
        const temperature = this.createDetectorForm({type: 'temperature', unit: 'celisus'});
        const humidity = this.createDetectorForm({type: 'humidity', unit: 'rfh'});
        sensorForm.controls['detectors'] = this.formBuilder.array([]);
        sensorForm.get('detectors').push(temperature);
        sensorForm.get('detectors').push(humidity);
        break;
      case 'chirp':
        const water = this.createDetectorForm({type: 'water', unit: 'level'});
        sensorForm.controls['detectors'] = this.formBuilder.array([]);
        sensorForm.get('detectors').push(water);
        break;
      case 'mhz16':
        const co2 = this.createDetectorForm({type: 'co2', unit: 'ppm'});
        sensorForm.controls['detectors'] = this.formBuilder.array([]);
        sensorForm.get('detectors').push(co2);
        break;
    }
  }

  addSensor = (sensors, sensor = {technology: 'i2c', detectors: []}): void => {
    const newSensor = this.createSensorForm(sensor);
    sensors.push(newSensor);
  };

  // ------------------------------- Dummy------------------------------
  addDummy(sensors) {
    const detectorDummy = {
      type: 'water',
      name: 'Birdy Chirp',
      unit: 'level'
    };
    const sensorDummy = {
      _id: null,
      technology: 'i2c',
      model: 'chirp',
      address: '72',
      detectors: [detectorDummy]
    };
    this.addSensor(sensors, sensorDummy);
  }
}
