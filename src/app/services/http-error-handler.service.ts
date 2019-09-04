import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable, of} from 'rxjs';

import {MessageService} from './message.service';

interface UserHttpErrorResponse extends HttpErrorResponse {
  userMessage: string;
}

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T, userErrorTitle?: string, options?: any) => (error: UserHttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(
    private messageService: MessageService,
    private toastrService: ToastrService,
  ) {
  }

  /** Create curried handleError function that already knows the service name */
    // tslint:disable:max-line-length
  createHandleError = (serviceName = '') => <T>
  (operation = 'operation', result = {} as T, userErrorTitle = null, options = {}) => this.handleError(serviceName, operation, result, userErrorTitle, options);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @param userErrorTitle - optional title for an user error message
   * @param options - optional if err is supressed
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T, userErrorTitle = 'Ouch', options: any = {}) {
    if (options.silent) {
      return (error: UserHttpErrorResponse): Observable<T> => {
        return of(result);
      };
    } else {
      return (error: UserHttpErrorResponse): Observable<T> => {
        // console.log("error handler", error);
        if (error.error && error.error.userErr && typeof error.error.userErr === 'string') {
          this.toastrService.error(error.error.userErr, userErrorTitle);
        } else if (error.error || error.statusText) {
          this.toastrService.error(error.error || error.statusText, 'Please contact support!');
        } else {
          const message = `server returned code ${error.status} with body "${error.error}"`;
          this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);
          this.toastrService.error(userErrorTitle);
        }

        return of(result);
      };
    }
  }
}
