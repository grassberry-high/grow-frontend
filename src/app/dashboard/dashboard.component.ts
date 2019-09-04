import {Component, OnInit} from '@angular/core';

import {WebsocketService} from 'src/app/services/websocket.service';
import {DeveloperService} from 'src/app/services/developer.service';
import * as moment from 'moment';
import {RelayService} from 'src/app/services/relay.service';
import {SettingService} from '../services/setting.service';
import {ChamberService} from '../services/chamber.service';
import {DashboardChartService} from './dashboard-charts/dashboard-chart.service';
import {SensorService} from '../services/sensor.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sensorData: any;
  developmentMode: boolean;
  developer = false;

  loaded = false;
  activeDevices = [];
  relays = []; // TODO: check temp for building
  chambers = [];
  sensors = [];

  itemPluralMapping = {
    'strain': {
      '=1': 'strain',
      'other': 'strains'
    }
  };

  constructor(
    private developerService: DeveloperService,
    private websocketService: WebsocketService,
    private relayService: RelayService,
    private sensorService: SensorService,
    private settingService: SettingService,
    private chamberService: ChamberService,
    private dashboardChartService: DashboardChartService
  ) {
    this.developmentMode = developerService.getDeveloperMode();
    developerService.developmentModeChange.subscribe((developmentMode) => {
      this.developmentMode = developmentMode;
    });
    this.websocketService.sensorData.subscribe((sensorData: any) => {
      this.sensorData = sensorData;
    });
    this.settingService.getActiveDevices().subscribe((activeDevices: any[]) => {
      this.activeDevices = activeDevices;
    });
  }

  ngOnInit() {
    this.getChambers();
  }


  toggleInfo(chamber) {
    chamber.hidden = !chamber.hidden;
  }

  // -------------------------- chamber --------------------------------
  getChambers(): void {
    this.chamberService.getChambers().subscribe(chambersBE => {
      this.loaded = true;
      this.chambers = chambersBE.map((chamber) => {
        chamber.stream = true;
        chamber.events = chamber.events || [];
        chamber.lights = chamber.rules.filter((rule) => rule.device === 'light').map((light) => {
          if (light.startTime) light.startTime = moment(light.startTime);
          return light;
        });
        console.log('chamber', chamber);
        this.sensorService.broadcastSensors();
        // this.relayService.broadcastOutputs()
        return chamber;
      });
    });
  }
}
