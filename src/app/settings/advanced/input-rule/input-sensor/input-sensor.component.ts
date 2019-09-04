import {Component, Input, OnInit} from '@angular/core';
import {SensorService} from 'src/app/services/sensor.service';
import {Detector} from '../../../../interfaces/interfaces';
import {findIndex} from 'lodash';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-input-sensor',
  templateUrl: './input-sensor.component.html',
  styleUrls: ['./input-sensor.component.scss']
})
export class InputSensorComponent implements OnInit {
  @Input() rule: FormGroup;
  @Input() label: string;
  @Input() class: string;
  @Input() nameSelector: string;
  // @Relay() ruleChange = new EventEmitter<any>()
  detectors: Detector[];
  filterDetectors: Function;
  selectedDetector: FormControl;
  detectorName: FormControl;
  private nameSubject: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private sensorService: SensorService
  ) {
    this.filterDetectors = this.sensorService.filterDetectors;
    this.nameSubject.pipe(debounceTime(1000)).subscribe((change) => {
      this.sensorService.updateDetectorName(change._id, change.newName);
    });
    this.createFormControls();
  }

  ngOnInit() {
    switch (this.rule.get('device').value) {
      case 'pump':
        this.detectors = this.filterDetectors(['water']);
        break;
      default:
        this.detectors = this.filterDetectors(['co2', 'temperature', 'humidity']);
    }
    this.initSensor();
  }

  updateRule(detectorChange) {
    this.rule.get('forDetector').setValue(detectorChange.forDetector);
    this.rule.get('detectorId').setValue(detectorChange.detectorId);
    this.rule.get('sensor').setValue(detectorChange.sensor);
    this.initDetectorName();
  }

  createFormControls() {
    this.selectedDetector = this.formBuilder.control([{}, Validators.required]);
    this.detectorName = this.formBuilder.control(['']);
    this.selectedDetector.valueChanges.subscribe((detectorChange: any) => {
      this.updateRule(detectorChange);
    });
  }

  initSensor() {
    const index = findIndex(this.detectors, (detector) => {
      return this.rule.get('detectorId').value === detector.detectorId;
    });
    if (index !== -1) this.selectedDetector.setValue(this.detectors[index]);
  }

  initDetectorName() {
    const index = findIndex(this.detectors, (detector) => {
      return this.selectedDetector.value.detectorId === detector.detectorId;
    });
    if (index !== -1) this.detectorName.setValue(this.detectors[index].detectorName);
  }

  debouncedRename(_id, newName) {
    this.nameSubject.next({_id: _id, newName: newName});
  }

}
