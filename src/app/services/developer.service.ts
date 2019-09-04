import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private developer: boolean;
  public developmentModeChange: Subject<boolean> = new Subject();

  constructor(
    private toastrService: ToastrService,
    private cookieService: CookieService,
  ) {
    this.developer = this.cookieService.get('developer') === 'true';
    this.developmentModeChange.next(this.developer);
  }

  public toggleDeveloperMode(): void {
    this.developer = !this.developer;
    console.info(`Development mode is ${this.developer}`);
    this.cookieService.set('developer', (this.developer).toString());
    this.toastrService.info(`Developermode ${this.developer}`);
    this.developmentModeChange.next(this.developer);
  }

  public getDeveloperMode(): boolean {
    return this.developer;
  }

}
