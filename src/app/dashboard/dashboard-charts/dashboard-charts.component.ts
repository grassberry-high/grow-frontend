import {Component, Input, OnInit, Sanitizer} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {DashboardChartService} from './dashboard-chart.service';
import {Chart} from 'chart.js';
import {DeveloperService} from '../../services/developer.service';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';
import * as moment from 'moment';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent implements OnInit {
  @Input() activeSensors;
  @Input() chamberName;
  charts = {};
  sensorData: any[];
  developmentMode: boolean;
  stream: FormControl;

  constructor(
    private sanitizer: Sanitizer,
    private websocketService: WebsocketService,
    private dashboardChartService: DashboardChartService,
    private developerService: DeveloperService,
    private formBuilder: FormBuilder
  ) {
    this.developmentMode = developerService.getDeveloperMode();
    developerService.developmentModeChange.subscribe((developmentMode) => {
      this.developmentMode = developmentMode;
    });
    this.stream = this.formBuilder.control(true);
    this.websocketService.sensorData.subscribe((sensorData: any) => {
      // console.log('received sensor data', sensorData.payload._id)
      if (this.charts[sensorData.payload._id] && this.stream.value === true) {
        this.dashboardChartService.updateChartValues(this.charts[sensorData.payload._id], sensorData.payload);
      }

    });
    this.stream = this.formBuilder.control(true);
  }

  ngOnInit() {
    this.activeSensors.forEach((activeSensor) => {
      const chart = this.dashboardChartService.initChart(activeSensor);
      this.charts[activeSensor._id] = chart;
    });
    // const ctx = document.getElementById('canvas')
    // console.log("ctx", ctx)
    // window.myLine = new Chart(ctx, this.config)
  }

  // -------------------------- crud --------------------------------
  updateSensorTimeUnit(chart, newTimeUnit) {
    this.dashboardChartService.updateSensorTimeUnit(chart, newTimeUnit);
  }

  // ------------------------- export --------------------------------
  showExport(charts) {
    return Object.keys(charts).every((key) => {
      return charts[key].loaded === true;
    });
  }

  exportChartGetFile(chamberName, charts): any {
    const exportChart = [];
    Object.keys(charts).forEach((key) => {
      charts[key].data.datasets.forEach((dataset, index) => {
        console.log(dataset);
        dataset.data.forEach((value) => {
          exportChart.push({time: value.x, data: value.y, series: charts[key].series[index]});
        });
      });
    });
    const chartOptions = {
      headers: ['Date & Time', 'Value', 'Probe']
    };
    return new Angular5Csv(exportChart, this.exportChartGetName(chamberName), chartOptions);
  }

  exportChartGetName(chamberName) {
    return chamberName + '_' + name + '_' + moment().toISOString();
  }

}
