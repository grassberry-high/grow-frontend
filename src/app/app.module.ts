// npm modules
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {HotkeyModule} from 'angular2-hotkeys';
import {MomentModule} from 'ngx-moment';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material';
// fontawesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// http and websocket
import {HttpErrorHandler} from 'src/app/services/http-error-handler.service';
import {MessageService} from 'src/app/services/message.service';
import {WebsocketService} from 'src/app/services/websocket.service';
// modules
import {SettingsModule} from './settings/settings.module';
import {FeedbackModule} from './feedback/feedback.module';
// components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ImprintComponent} from './imprint/imprint.component';
import {AdvancedComponent} from './settings/advanced/advanced.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {GeneralComponent} from './settings/general/general.component';
import {SensorComponent} from './settings/sensor/sensor.component';
// services
import {ChamberService} from 'src/app/services/chamber.service';
import {SystemService} from './services/system.service';
import {ConfirmDialogService} from './confirm-dialog/confirm-dialog.service';
import {QuickComponent} from './settings/quick/quick.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LeaflyPipe} from './pipes/leafly/leafly.pipe';
import {FeedbackComponent} from './feedback/feedback.component';
// websocket
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';

const config: SocketIoConfig = {url: environment.websocket, options: {}};

// routes
const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'advanced', component: AdvancedComponent},
  {path: 'quick', component: QuickComponent},
  {path: 'general', component: GeneralComponent},
  {path: 'sensor', component: SensorComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'imprint', component: ImprintComponent},
  {path: '**', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImprintComponent,
    ConfirmDialogComponent,
    LeaflyPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    SettingsModule,
    DashboardModule,
    FeedbackModule,
    ReactiveFormsModule,
    HotkeyModule.forRoot(),
    FontAwesomeModule,
    MomentModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      enableHtml: true,
      closeButton: true
    })
  ],
  providers: [
    CookieService,
    HttpErrorHandler,
    MessageService,
    ChamberService,
    WebsocketService,
    SystemService,
    ConfirmDialogService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
