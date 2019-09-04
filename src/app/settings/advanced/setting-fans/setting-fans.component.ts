import {Component, OnInit} from '@angular/core';
import {SettingRulesComponent} from '../setting-rules/setting-rules.component';
import {RuleService} from '../../../services/rule.service';
import {SensorService} from '../../../services/sensor.service';

@Component({
  selector: 'app-setting-fans',
  templateUrl: './setting-fans.component.html',
  styleUrls: ['./setting-fans.component.scss']
})
export class SettingFansComponent extends SettingRulesComponent implements OnInit {
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
