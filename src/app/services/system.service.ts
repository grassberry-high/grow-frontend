import {Injectable} from '@angular/core';
// http requests
import {HttpClient} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Subject} from 'rxjs';
import {System} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private handleError: HandleError;
  systemChange: Subject<System> = new Subject<System>();

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ChamberService');
  }

// ---------------------------------- Wifi -------------------------------------
  getSystem() {
    const url = environment.endpointBase + environment.endpoints.getSystem;
    return this.http.get(url).pipe(
      catchError(this.handleError('getSystem', null))
    ).subscribe((system) => {
      if (system) this.systemChange.next(system);
    });
  }


  checkLicense() {
    const url = environment.endpointBase + environment.endpoints.getLicenseInformation;
    return this.http.get(url).pipe(
      catchError(this.handleError('getLicenseInformation', null, '', {silent: true}))
    );
  }

  reboot() {
    const url = environment.endpointBase + environment.endpoints.reboot;
    return this.http.get(url).pipe(
      catchError(this.handleError('reboot', null))
    );
    // BootstrapDialog.confirm({
    //   title: 'Reboot',
    //   message: 'Are you sure? This will shutdown and reboot the system.',
    //   type: BootstrapDialog.TYPE_INFO
    //   callback: (success)->
    //     if success
    //       $http
    //         url: "/reboot"
    //         method: "GET"
    //       .then (response) ->
    //         if response.data?.err?
    //           BootstrapDialog.alert({
    //             title: 'Could not reboot',
    //             message: response.data.err,
    //             type: BootstrapDialog.TYPE_DANGER
    //           })
    //         return null
    // })
  }
}
