import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HotkeyModule} from 'angular2-hotkeys';
import {MomentModule} from 'ngx-moment';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ModalDialogModule} from 'ngx-modal-dialog';
// tslint:disable-next-line:max-line-length
import {
  faExclamationTriangle,
  faInfoCircle,
  faPlug,
  faSnowflake,
  faToggleOff,
  faToggleOn,
  faTrash,
  faVial
} from '@fortawesome/free-solid-svg-icons';
// pipes
import {UnitPipe} from 'src/app/pipes/unit.pipe';
// components
import {AdvancedComponent} from './advanced/advanced.component';
import {SettingLightsComponent} from './advanced/setting-lights/setting-lights.component';
import {SettingStrainsComponent} from './advanced/setting-strains/setting-strains.component';
import {InputRelayComponent} from './advanced/input-rule/input-relay/input-relay.component';
import {InputSensorComponent} from './advanced/input-rule/input-sensor/input-sensor.component';
import {InputRuleComponent} from './advanced/input-rule/input-rule.component';
import {SettingFansComponent} from './advanced/setting-fans/setting-fans.component';
import {SettingPumpsComponent} from './advanced/setting-pumps/setting-pumps.component';
import {GeneralComponent} from './general/general.component';
import {SettingRegionComponent} from './general/setting-region/setting-region.component';
import {SettingWifiComponent} from './general/setting-wifi/setting-wifi/setting-wifi.component';
import {RebootModalComponent} from './general/setting-wifi/setting-wifi/reboot-modal/reboot-modal.component';
import {SettingUnitComponent} from './general/setting-unit/setting-unit.component';
import {SettingSoftwareComponent} from './general/setting-software/setting-software.component';
import {SettingResetComponent} from './general/setting-reset/setting-reset.component';
import {SensorComponent} from './sensor/sensor.component';
import {InputDetectorsComponent} from './sensor/input-detectors/input-detectors.component';
import {QuickComponent} from './quick/quick.component';
import {MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DevicesModule} from '../devices/devices.module';
import {SharedPipesModule} from '../pipes/shared-pipes/shared-pipes.module';
import {ErrMsgModule} from '../err-msg/err-msg.module';

library.add(faSnowflake, faPlug, faToggleOn, faToggleOff, faTrash, faVial, faInfoCircle, faExclamationTriangle);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgbModule,
    FontAwesomeModule,
    HotkeyModule,
    MomentModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ScrollToModule.forRoot(),
    ModalDialogModule.forRoot(),
    DevicesModule,
    SharedPipesModule,
    ErrMsgModule,
  ],
  declarations: [
    AdvancedComponent,
    UnitPipe,
    SettingLightsComponent,
    SettingStrainsComponent,
    InputRelayComponent,
    InputSensorComponent,
    InputRuleComponent,
    SettingFansComponent,
    SettingPumpsComponent,
    GeneralComponent,
    SettingRegionComponent,
    SettingWifiComponent,
    RebootModalComponent,
    SettingUnitComponent,
    SettingSoftwareComponent,
    SettingResetComponent,
    SensorComponent,
    InputDetectorsComponent,
    QuickComponent
  ],
  entryComponents: [RebootModalComponent],
  exports: [AdvancedComponent]
})
export class SettingsModule {
}
