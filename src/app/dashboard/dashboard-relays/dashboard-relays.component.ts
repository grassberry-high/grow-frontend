import {Component, Input, OnInit} from '@angular/core';
import {RelayService} from '../../services/relay.service';

@Component({
  selector: 'app-dashboard-relays',
  templateUrl: './dashboard-relays.component.html',
  styleUrls: ['./dashboard-relays.component.scss']
})
export class DashboardRelaysComponent implements OnInit {
  @Input() relays;

  constructor(
    private relayService: RelayService
  ) {
  }

  ngOnInit() {
    if (!this.relays) {
      this.relays = [];
    }
  }

  operateRelay(relay) {
    let operation = 'switchOff';
    if (relay.state === 0) operation = 'switchOn';
    this.relayService.operateRelay(relay._id, operation).subscribe((success) => {
      if (success === true) {
        relay.state = -relay.state + 1; // 0 + 1 = 1 (on), -(1) +1 = 0 (off)
      }
    });
  }

}
