import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
// http requests
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {Subject, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {System} from '../../../interfaces/interfaces';
import {ConfirmDialogService} from 'src/app/confirm-dialog/confirm-dialog.service';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private handleError: HandleError;
  system: System;
  wifiOptionsChange: Subject<any> = new Subject<any>();

  constructor(
    private confirmDialogService: ConfirmDialogService,
    private toastrService: ToastrService,
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ConfigService');
  }

// ---------------------------------- Wifi -------------------------------------
  getWifiOptions(): any {
    const url = environment.endpointBase + environment.endpoints.getWifiOptions;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError('getWifiOptions', [], 'Could not get Wifi Information'))
    ).subscribe((wifiOptions) => {
      this.wifiOptionsChange.next(wifiOptions);
    });
  }

  configureWifi(wifi): any {
    const url = environment.endpointBase + environment.endpoints.configureWifi;
    const data = {
      wifi: wifi
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('getWifiOptions', false, 'Could not Update Wifi Settings'))
    );
  }

// ---------------------------------- Date,Time & Timezone -------------------------------------
  configureDateTime(dateTimeConfig): any {
    const url = environment.endpointBase + environment.endpoints.configureDateTime;
    const data = {
      dateTimeConfig: dateTimeConfig
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('configureDateTime', false, 'Could not Update Date & Time Setting'))
    );
  }

// ---------------------------------- Units -------------------------------------
  getSystem(): Subscription {
    const url = environment.endpointBase + environment.endpoints.getSystem;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError('getSystem', [], 'Could not Get System'))
    ).subscribe((system: System) => {
      this.system = system;
    });
  }

  updateSystemUnits(units): any {
    const url = environment.endpointBase + environment.endpoints.updateSystem;
    const data = {
      system: {units: units}
    };
    return this.http.post(url, data, httpOptions).pipe(
      catchError(this.handleError('updateSystemUnits', false, 'Could not Update Unit Settings'))
    );
  }

// ---------------------------------- Softwareupdate -------------------------------------
  updateSoftware(): any {
    const url = environment.endpointBase + environment.endpoints.updateSoftware;
    return this.http.get(url, httpOptions).pipe(
      catchError(this.handleError('updateSoftware', false, 'Failed to update Software'))
    );
  }

// ---------------------------------- Reset -------------------------------------
  reset(): void {
    this.confirmDialogService.confirm('Do you want to reset the system?', 'Please choose:')
      .then((confirmed) => {
        if (confirmed) {
          const url = environment.endpointBase + environment.endpoints.reset;
          return this.http.get(url, httpOptions).pipe(
            catchError(this.handleError('getSystem', false, 'Reset failed'))
          );
        } else {
          console.log('User dismissed reset');
        }
      })
      .catch(() => console.log('User dismissed reset'));
  }
}
