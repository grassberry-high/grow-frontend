import {Component, Input, OnInit} from '@angular/core';
import {RuleService} from '../../../services/rule.service';
import {SensorService} from '../../../services/sensor.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {options} from './input-options';
import {cloneDeep} from 'lodash';
import {RuleFormService} from './rule-form.service';
import * as moment from 'moment';

@Component({
  selector: 'app-input-rule',
  templateUrl: './input-rule.component.html',
  styleUrls: ['./input-rule.component.scss']
})
export class InputRuleComponent implements OnInit {
  @Input() chamberForm: FormGroup;
  @Input() ruleDevice: string;
  detectorFilter: string[] = [];
  filterDetectors: Function;
  refreshSensor: Function;
  filterRules: Function;
  durationOn: number;
  timeUnit: number;
  timepickerConfig = options.timepickerConfig;
  timeUnitOptions = options.timeUnitOptions;
  cronPatternOptions = options.cronPatternOptions;
  waterOptions = options.waterOptions;
  blockedTillOptions = options.blockedTillOptions;
  unitOptions = options.unitOptions;
  newRuleBtns = options.newRuleBtns;
  btnFilter: string[];
  timeOnHelperForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ruleFormService: RuleFormService,
    private ruleService: RuleService,
    private sensorService: SensorService
  ) {
    this.filterDetectors = sensorService.filterDetectors;
    this.refreshSensor = sensorService.refreshSensor;
    this.filterRules = ruleService.filterRules;
  }

  ngOnInit() {
    switch (this.ruleDevice) {
      case 'light': {
        this.btnFilter = ['timeOnOff'];
        break;
      }
      case 'fan': {
        this.btnFilter = ['interval', 'thresholdOnOff', 'alwaysOn'];
        this.detectorFilter = ['co2', 'temperature', 'humidity'];
        break;
      }
      case 'pump': {
        this.btnFilter = ['interval', 'thresholdTimer', 'thresholdOff'];
        this.detectorFilter = ['water'];
        break;
      }
      default: {
        this.btnFilter = [];
        this.detectorFilter = [];
      }
    }
    this.timepickerConfig.startAt = moment().subtract(1, 'hour').startOf('hour');
  }

  // -------------------------------------  form -------------------------------------
  get rules() {
    return this.chamberForm.get('rules') as FormArray;
  }

  // -------------------------------------  helper -------------------------------------
  capitalizeFirstletter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // -------------------------------------  filter -------------------------------------
  filterBtns(): any[] {
    return this.newRuleBtns.filter((btn: any) => {
      return this.btnFilter.some((btnIncluded) => {
        return btn.trigger === btnIncluded;
      });
    });
  }

  isSensorBased(trigger) {
    return ['thresholdOnOff', 'thresholdOff', 'thresholdTimer'].some((sensorBasedTrigger) => {
      return sensorBasedTrigger === trigger;
    });
  }

// -------------------------------------  add and remove -------------------------------------
  addNewRule(newRule, trigger?): void {
    let newRuleCopy;
    if (typeof newRule === 'string') {
      newRuleCopy = this.ruleFormService.createRuleForm({device: newRule, trigger: trigger});
      switch (trigger) {
        case 'thresholdTimer':
          newRuleCopy.get('durationMBlocked').setValue(60);
          break;
      }
      if (newRule === 'pump' && (trigger === 'thresholdTimer' || 'interval')) newRuleCopy.get('onValue').setValue(2);// below moist -> dry
    } else {
      newRuleCopy = cloneDeep(newRule);
      delete (newRuleCopy._id);
    }
    this.rules.push(newRuleCopy);
  }

  removeRule(index): void {
    this.rules.removeAt(index);
  }
}
