import {Component, Input, OnInit} from '@angular/core';
import {RelayService} from '../services/relay.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  @Input() activeDevices;
  relays: any[];

  constructor(
    private relayService: RelayService
  ) {
    this.relayService.relaysChanged.subscribe( (relays) => {
      this.relays = relays;
    });
  }

  ngOnInit() {
  }

  // ------------------------------- Relays------------------------------
  operateRelay(relay): void {
    let operation: string;
    if (relay.state === 0) {
      operation = 'switchOn';
    } else {
      operation = 'switchOff';
    }
    this.relayService.operateRelay(relay._id, operation).subscribe((success) => {
      if (success === true) {
        relay.state = -relay.state + 1; // 0 + 1 = 1 (on), -(1) +1 = 0 (off)
      }
    });
  }

}
