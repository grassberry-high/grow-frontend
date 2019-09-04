import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-light-percentage',
  templateUrl: './light-percentage.component.html',
  styleUrls: ['./light-percentage.component.scss']
})
export class LightPercentageComponent implements OnInit {
  @Input() light;
  bars = [];

  constructor() {
  }

  ngOnInit() {
    this.bars = this.buildLightBar(this.light);
  }

  buildLightBar(light) {
    const dayMinutes = 24 * 60;
    const bars = [];

    // offset
    const diffMinutes = light.startTime.hours() * 60 + light.startTime.minutes();
    let offsetStart = Math.round(diffMinutes / dayMinutes * 100);

    // on time
    let onTime = Math.round(light.durationHOn * 60 / dayMinutes * 100);

    // off time
    const offTime = 100 - onTime - offsetStart; // + if not exceeding 24h, - if exceeding 24h

    // 1st bar on if time exceeds 24h
    if (offTime < 0) {
      console.log('Exceed bar', -offTime);
      bars.push({value: -offTime, type: 'on'});
      // also the offset is smaller because the first part in the offset is 'on'
      offsetStart = offsetStart - (-offTime);
      onTime = onTime - (-offTime);
    }

    // 2nd bar off if offsetStart > 0
    if (offsetStart > 0) {
      console.log('Offset bar', offsetStart);
      bars.push({value: offsetStart, type: 'off'});
    }

    // 3rd bar on time
    if (onTime > 0) {
      console.log('Ontime bar', onTime);
      bars.push({value: onTime, type: 'on'});
    }

    // 4th bar off time if off time is > o
    if (offTime > 0) {
      console.log('Offtime bar', onTime);
      bars.push({value: offTime, type: 'off'});
    }

    return bars;
  }

}
