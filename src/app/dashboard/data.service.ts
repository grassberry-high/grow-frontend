import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../services/http-error-handler.service';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('DataService');
  }

  /**
   * Read events
   */
  readEvents(filterReadEvents, optionsReadEvents) {
    const url = environment.endpointBase + environment.endpoints.readEvents;
    const data = {
      filterReadEvents, optionsReadEvents
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('readEvents', []))
    );
  }

  /**
   * Clear events
   */
  clearEvents(filterClearEvents, optionsClearEvents) {
    const url = environment.endpointBase + environment.endpoints.clearEvents;
    const data = {
      filterClearEvents, optionsClearEvents
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('clearEvents', []))
    );
  }
}
