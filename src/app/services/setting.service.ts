import {Injectable} from '@angular/core';
//http requests
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ChamberService');
  }

  getActiveDevices() {
    const url = environment.endpointBase + environment.endpoints.getActiveDevices;
    return this.http.get(url).pipe(
      catchError(this.handleError('getActiveDevices', []))
    );
  }
}
