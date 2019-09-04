import {Component, OnInit} from '@angular/core';
import {SettingRulesComponent} from '../setting-rules/setting-rules.component';
import {RuleService} from '../../../services/rule.service';
import {SensorService} from '../../../services/sensor.service';

@Component({
  selector: 'app-setting-pumps',
  templateUrl: './setting-pumps.component.html',
  styleUrls: ['./setting-pumps.component.scss']
})
export class SettingPumpsComponent extends SettingRulesComponent implements OnInit {
  constructor( // QUESTION - DO I REALLY NEED TO INJECT THAT or IS THERE a STATIC WAY on the PARENT?
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
