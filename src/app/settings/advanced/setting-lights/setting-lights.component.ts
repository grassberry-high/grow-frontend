import {Component, Input, OnInit} from '@angular/core';
import {SettingRulesComponent} from '../setting-rules/setting-rules.component';
import {RuleService} from '../../../services/rule.service';
import {SensorService} from '../../../services/sensor.service';

@Component({
  selector: 'app-setting-lights',
  templateUrl: './setting-lights.component.html',
  styleUrls: ['./setting-lights.component.scss']
})
export class SettingLightsComponent extends SettingRulesComponent implements OnInit {
  @Input() chamberCycle: string;

  constructor(
    protected ruleService: RuleService,
    protected sensorService: SensorService
  ) {
    super(
      ruleService,
      sensorService
    );
  }

  ngOnInit() {
  }

}
