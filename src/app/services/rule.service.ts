import {Injectable} from '@angular/core';
// http requests
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ChamberService');
  }

  // ------------------------------- Helpers ------------------------------
  filterRules(chamber, includedDevices): void {
    // console.log('filtering rules for devices', includedDevices)
    const rules = chamber.rules.filter(rule => {
      return includedDevices.some(device => rule.device === device);
    });
    // console.log('found', rules, 'in', chamber.rules)
    return rules;
  }
}
