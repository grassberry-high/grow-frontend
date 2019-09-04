import {Injectable} from '@angular/core';
import {isEqual, pickBy} from 'lodash';
// http requests
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {environment} from 'src/environments/environment';
import {AdvancedFormService} from '../settings/advanced/advanced-form.service';
import * as chamberDummy from '../settings/advanced/chamber.dummy.json';

const httpOptions = {headers: new HttpHeaders({})};

@Injectable({
  providedIn: 'root'
})

export class ChamberService {
  private handleError: HandleError;
  private chamberDummy = (<any>chamberDummy).default;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private toastrService: ToastrService,
    private advancedFormService: AdvancedFormService
  ) {
    this.handleError = httpErrorHandler.createHandleError('ChamberService');
  }

  public daysToHarvest(strain, day): number {
    return strain.daysToHarvest - day;
  }

  getChambers(): any { // TODO: how to make the type specific e.g. Observable<Chamber[]>
    const url = environment.endpointBase + environment.endpoints.getChambers;
    return this.http.post(url, {}, httpOptions).pipe(
      catchError(this.handleError('getChambers', []))
    );
  }

  cleanEmpty(toClean) {
    return pickBy(toClean, (value) => {
      if (!value) return false;
      if (value.constructor === Array) {
        value = value.map((element) => {
          return this.cleanEmpty(element);
        }).filter((element) => {
          return !isEqual(element, {});
        });
        return !isEqual(value, []);
      } else {
        return value !== '';
      }
    });
  }

  validateChamber(chamber, callback) {
    let err = '';
    if (!chamber.name) err += '- Your chamber needs a name.\n';
    chamber = this.cleanEmpty(chamber);

    if (chamber.rules) {
      chamber.rules = chamber.rules.filter(rule => {
        // switch (rule.trigger) {
        //   case '':
        //     break;
        //   case '':
        //     break;
        //   case '':
        //     break;
        //   case '':
        //     break;
        // }
        if (rule.relay._id) {
          return true;
        } else {
          err += 'Every rule needs an relay.\n';
        }
      });
    }

    if (err !== '') return callback('From Giraffee to, well lets call you - human -:\n' + err);
    return callback(null, chamber);
  }


  upsertChamber(chamber) {
    const url = environment.endpointBase + environment.endpoints.upsertChamber;
    const data = {
      chamber: chamber.value
    };
    return this.http.post(url, data, httpOptions).pipe(
      tap(() => this.toastrService.success('Updated/created chamber')),
      catchError(this.handleError('upsertChamber', false))
    );
  }

  fillChamberWithDummy(chambers, index = 0) {
    chambers.controls[index] = this.advancedFormService.buildChamberForm(this.chamberDummy);
  }
}
