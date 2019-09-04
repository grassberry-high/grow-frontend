import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevicesComponent} from './devices.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlug, faToggleOff, faToggleOn, faVial} from '@fortawesome/free-solid-svg-icons';

library.add(faPlug, faToggleOn, faToggleOff, faVial);

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  declarations: [
    DevicesComponent
  ],
  exports: [
    DevicesComponent
  ]
})
export class DevicesModule {
}
