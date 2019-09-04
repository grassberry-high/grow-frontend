import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-input-detectors',
  templateUrl: './input-detectors.component.html',
  styleUrls: ['./input-detectors.component.scss']
})
export class InputDetectorsComponent implements OnInit {
  @Input() sensor;
  typeOptions = {
    hdc1000: [{longName: 'Temperature', shortName: 'temperature'}, {longName: 'Humidity', shortName: 'humidity'}],
    chirp: [{longName: 'Water', shortName: 'water'}],
    mhz16: [{longName: 'Co2', shortName: 'co2'}],
    sensorTag: [{longName: 'Temperature', shortName: 'temperature'}, {longName: 'Humidity', shortName: 'humidity'}]
  };
  unitOptions = {
    temperature: [{longName: 'Celsius', shortName: 'celsius'}, {longName: 'Fahrenheit', shortName: 'fahrenheit'}],
    humidity: [{longName: 'RH', shortName: 'rh'}],
    water: [{longName: 'level', shortName: 'level'}],
    co2: [{longName: 'ppm', shortName: 'ppm'}]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
