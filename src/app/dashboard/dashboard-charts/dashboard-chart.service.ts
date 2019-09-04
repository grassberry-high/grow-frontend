import {Injectable} from '@angular/core';
import baseChartScaffold from './chart-scaffolds/base-chart-scaffold.json';
import chirpChartScaffold from './chart-scaffolds/chirp-chart-scaffold.json';
import hdc1000ChartScaffold from './chart-scaffolds/hdc1000-chart-scaffold.json';
import mhz16ChartScaffold from './chart-scaffolds/mhz-16-chart-scaffold.json';
import {cloneDeep, merge} from 'lodash';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SensorService} from '../../services/sensor.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {
  mode: any;
  scaffolds: any;
  chambers = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sensorService: SensorService
  ) {
    this.scaffolds = {
      hdc1000: merge(cloneDeep(baseChartScaffold), hdc1000ChartScaffold),
      mhz16: merge(cloneDeep(baseChartScaffold), mhz16ChartScaffold),
      chirp: merge(cloneDeep(baseChartScaffold), chirpChartScaffold)
    };

    const layoutChanges = this.breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);
    layoutChanges.subscribe(layout => {
      this.updateMyLayoutForOrientationChange(layout);
    });
  }

  // ================================================== HELPERS ================================
  // ------------------------------------- X/Y Axes, Timescale ----------------------------------------
  setChartTimescale(chart, scale) {
    // const parsers = {
    //   'seconds': 'mm:ss',
    //   'minutes': 'HH:mm',
    //   'hours': 'DD HH'
    // }
    // chart.scale = scale
    // chart.options.scales.xAxes[0].scaleLabel.labelString = `Time (${scale})`
    // chart.options.scales.xAxes[0].time.parser = parsers[scale]
  }

  setChartLabel(chart) {
    chart.options.tooltips = {
      callbacks: {
        title: (tooltipItem) => {
          return 'Date/Time: ' + tooltipItem[0].xLabel;
        },
        label: (tooltipItem, data) => {
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.yLabel.toFixed(2)}`;
        }
      }
    };
    return chart;
  }

  adjustScale(chart, index, history) {
    // const min = minBy(history, 'y').y
    // const max = maxBy(history, 'y').y
    // console.log("min", min, "max", max)
    // let stepSize
    // const diff = max - min
    // if (diff > 500) {
    //   stepSize = 100
    // } else if (diff > 250) {
    //   stepSize = 50
    // } else if (diff > 50) {
    //   stepSize = 10
    // } else if (diff > 25) {
    //   stepSize = 5
    // } else if (diff > 5) {
    //   stepSize = 1
    // } else if (diff > 2.5) {
    //   stepSize = 0.5
    // } else {
    //   stepSize = 0.1
    // }
    //
    // if (chart.options.scales.yAxes[index].ticks.stepSize !== stepSize) {
    //   console.info(`Adjusted step size from ${chart.options.scales.yAxes[index].ticks.stepSize}`)
    //   console.info(`max ${max} , min #{min}, diff: ${max-min} to stepSize ${stepSize}`)
    //   chart.options.scales.yAxes[index].ticks.stepSize = stepSize
    // }
  }

  // =============================== RESPONSIVE CHARTS ========================
  showHideYAxis(chambers, value) {
    chambers.forEach((chamber) => {
      chamber.charts.forEach((chart) => {
        chart.options.scales.yAxes.forEach((yAxis) => {
          yAxis.display = value;
        });
        chart.options.scales.xAxes.forEach((xAxis) => {
          xAxis.display = value;
        });
      });
    });
  }

  updateMyLayoutForOrientationChange(layout) { // TODO check if valid
    // if (layout === 'mobile') {
    //   this.mode = 'mobile'
    //   this.showHideYAxis = false
    // } else {
    //   this.mode = 'desktop'
    //   this.showHideYAxis = true
    // }
  }

// =============================== INIT CHARTS ========================
// ------------------------------------ - Build Scaffolds ----------------------------------------
  buildChart(activeSensor) {
    let chart;
    if (this.scaffolds[activeSensor.model]) {
      chart = this.scaffolds[activeSensor.model];
    } else {
      console.error(`No chartscaffold ${activeSensor.model}`);
      return null;
    }
    chart.sensor = activeSensor._id;
    this.setChartTimescale(chart, 'seconds');
    this.setChartLabel(chart);
    // create a graph inside the chart for each detector
    activeSensor.detectors.forEach((detector) => {
      const detectorId = activeSensor._id + detector.type;
      chart.activeDetectors.push(detectorId);
      // console.log('detector.type', detector.type, chart.colors)
      chart.data.datasets.push({
        label: detector.type,
        data: [],
        backgroundColor: chart.colors[detector.type].backgroundColor,
        borderColor: chart.colors[detector.type].borderColor
      });
      const series = detector.name || detector.label;
      chart.series.push(series);
    });
    return chart;
  }


  initChart(activeSensor) {
    return this.buildChart(activeSensor);
  }

  // =============================== CHARTS UPDATES ========================
  // ------------------------------------ - Update Chart Timescale ----------------------------------------
  updateSensorTimeUnit(chart, newTimeUnit) {
    this.sensorService.updateSensorTimeUnit(chart.sensor, newTimeUnit).subscribe((sensorData) => {
      if (sensorData) this.updateChartValues([chart], sensorData);
      this.setChartTimescale(chart, newTimeUnit);
    });
  }


  updateChartValues(chart, sensorData) {
    chart.loaded = true;
    // works with a copy otherwise chartjs redraws the chart on each new value
    const chartDataSetsCopy = chart.data.datasets; // JSON.parse(JSON.stringify(chart.data.datasets))
    // console.log('chartDataSetsCopy', chartDataSetsCopy)
    sensorData.detectors.forEach((detector) => {
      const detectorId = sensorData._id + detector.type;
      const index = chart.activeDetectors.indexOf(detectorId);
      // console.log(index, 'chartDataSetsCopy', chartDataSetsCopy)
      // console.log(index, 'chartDataSetsCopy[index]', chartDataSetsCopy[index])
      chartDataSetsCopy[index].data = detector.history;
      if (chart.scale !== sensorData.timeUnit) this.setChartTimescale(chart, sensorData.timeUnit);
      // this.adjustScale(chart, index, detector.history)
    });
    // console.log('AFTER:', chart)
    chart.data.datasets = chartDataSetsCopy;
  }
}
