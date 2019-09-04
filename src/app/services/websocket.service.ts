import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ReplaySubject} from 'rxjs';


@Injectable()
export class WebsocketService {
  public sensorData: ReplaySubject<any> = new ReplaySubject();
  public systemData: ReplaySubject<any> = new ReplaySubject();
  public relayData: ReplaySubject<any> = new ReplaySubject();
  public eventData: ReplaySubject<any> = new ReplaySubject();

  public constructor(
    private socket: Socket
  ) {
    this.connect();
  }

  private connect(): void {
    // this.socket.on('connect', () => console.log('connected'))
    this.socket.on('sensorData', (data) => {
      // console.log('ws sensorData', data);
      this.sensorData.next(data);
    });

    this.socket.on('relayData', (data) => {
      // console.log('ws relayData', data);
      this.relayData.next(data);
    });

    this.socket.on('eventData', (data) => {
      // console.log('ws relayData', data);
      if (data && data.payload) {
        this.eventData.next(data.payload);
      }
    });

    this.socket.on('system', (data) => {
      // console.log('ws system', data);
      this.systemData.next(data);
    });
  }

  // private connect(): Subject<MessageEvent> {
  //   this.socket = io(environment.endpoint)
  //   this.socket.on('connect',() => console.log('connected'))
  //   this.socket.on('sensorData', (data) => {
  //     this.sensorData.next(data)
  //   })
  // }


  public send(data: any): void {
    this.socket.emit('message', JSON.stringify(data));
  }

}
