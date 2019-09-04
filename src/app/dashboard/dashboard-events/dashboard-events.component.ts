import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {WebsocketService} from '../../services/websocket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.scss']
})
export class DashboardEventsComponent implements OnInit {
  @Input() relays;
  events: any[] = [];

  constructor(
    private dataService: DataService,
    private websocketService: WebsocketService,
  ) {
    this.websocketService.eventData.subscribe( (eventData) => {
      this.events.unshift(eventData);
    });
  }

  ngOnInit() {
    if (!this.relays) {
      this.relays = [];
    }
    this.getEvents();
  }

  isNew(timestamp) {
    return moment().diff(timestamp, 'minutes') < 1
  }

  // ------------------------------- data ------------------------------
  getEvents() {
    if (this.relays.length > 0) {
      const filterReadEvents = {relays: this.relays.map((relay) => relay._id)};  // { outputIds: "aaa"}
      const optionsReadEvents = {populate: {relay: true}, limit: 5};
      this.dataService.readEvents(filterReadEvents, optionsReadEvents).subscribe((events: any[]) => {
        this.events = events;
      });
    }
  }

  clearEvents() {
    const filterClearEvents = {};
    const optionsClearEvents = {};
    this.dataService.clearEvents(filterClearEvents, optionsClearEvents).subscribe(() => {
      this.events = [];
    });
  }

}
