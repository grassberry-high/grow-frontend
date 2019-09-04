import {Injectable, Input, OnInit} from '@angular/core';
import {RuleService} from 'src/app/services/rule.service';
import {SensorService} from 'src/app/services/sensor.service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export abstract class SettingRulesComponent implements OnInit {
  @Input() chamberForm: FormGroup;
  // sensors: Sensor[]
  filterRules: Function;
  filterDetectors: Function;

  protected constructor(
    protected ruleService: RuleService,
    protected sensorService: SensorService
  ) {
    this.filterRules = this.ruleService.filterRules;
    this.filterDetectors = this.sensorService.filterDetectors;
    // this.sensorService.sensorsChanged.subscribe((sensors) => {
    //   this.sensors = sensors
    // })
  }

  ngOnInit() {
  }

  get cycle() {
    return this.chamberForm.get('cycle').value as string;
  }

}



