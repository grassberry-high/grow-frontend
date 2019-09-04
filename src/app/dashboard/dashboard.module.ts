import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DevicesModule} from '../devices/devices.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HotkeyModule} from 'angular2-hotkeys';
import {SharedPipesModule} from '../pipes/shared-pipes/shared-pipes.module';
import {LightPercentageComponent} from './light-percentage/light-percentage.component';
import {DashboardChartsComponent} from './dashboard-charts/dashboard-charts.component';
import {SensorPipe} from '../pipes/sensor.pipe';
import {CheckboxComponent} from '../shared-components/checkbox/checkbox.component';
import {ChartjsModule} from '@ctrl/ngx-chartjs';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faGasPump,
  faPercent,
  faPlug,
  faSnowflake,
  faThermometerHalf,
  faTint,
  faToggleOff,
  faToggleOn
} from '@fortawesome/free-solid-svg-icons';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardEventsComponent} from './dashboard-events/dashboard-events.component';
import {DashboardRelaysComponent} from './dashboard-relays/dashboard-relays.component';

library.add(faThermometerHalf, faPercent, faTint, faGasPump, faSnowflake, faPlug, faToggleOn, faToggleOff);


@NgModule({
  imports: [
    FontAwesomeModule,
    CommonModule,
    NgbModule,
    HotkeyModule,
    DevicesModule,
    SharedPipesModule,
    ChartjsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    LightPercentageComponent,
    DashboardChartsComponent,
    CheckboxComponent,
    SensorPipe,
    DashboardEventsComponent,
    DashboardRelaysComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
