import {Injectable} from '@angular/core';
import {findIndex, orderBy} from 'lodash';
// http requests
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {Observable, ReplaySubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Relay} from '../interfaces/interfaces';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})
export class RelayService {
  private handleError: HandleError;
  relaysChanged: ReplaySubject<Relay[]> = new ReplaySubject<Relay[]>();
  relays: Relay[];

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ChamberService');
    this.getRelays();
  }

  // ============================================= CRUD ================================================
  getRelays(): Observable<Relay[]> {
    const url = environment.endpointBase + environment.endpoints.getRelays;
    const data = {};
    this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('getRelays', false))
    ).subscribe(relays => {
      this.relays = orderBy(relays, 'label');
      this.relaysChanged.next(this.relays);
    });
    return this.relaysChanged;
  }


  renameRelay = (relayId, name) => {
    const url = environment.endpointBase + environment.endpoints.renameRelay;
    const data = {
      _id: relayId,
      name: name
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('renameRelay', false))
    ).subscribe(() => {
      const index = findIndex(this.relays, (relay) => {
        return relay._id === relayId;
      });
      this.relays[index].name = name;
      this.relaysChanged.next(this.relays);
    });
  };


  operateRelay(id, operation) {
    const url = environment.endpointBase + environment.endpoints.operateRelay;
    const data = {
      id: id,
      operation: operation
    };
    console.log('ut', url, data);
    return this.http.put(url, data, httpOptions).pipe(
      catchError(this.handleError('operateRelay', false))
    );
  }

  // ============================================= Broadcast ================================================
  broadcastRelays() {
    const url = environment.endpointBase + environment.endpoints.broadcastRelays;
    return this.http.get(url).pipe(
      catchError(this.handleError('broadcastRelays', false))
    );
  }

  // ============================================= Websockets ================================================
  updateRelayValues(chambers, relayData) {
    if (chambers.length === 0) return null;
    for (const chamber of chambers) {
      if (chamber.allRelays) {
        const index = findIndex(chamber.allRelays, {_id: relayData._id});
        if (index !== -1) chamber.allRelays[index].state = relayData.state;
      }
    }
    return null;
  }

}
