import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelayPipe} from '../relay.pipe';
import {LastPipe} from '../last/last.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RelayPipe,
    LastPipe
  ],
  exports: [
    RelayPipe,
    LastPipe
  ]
})
export class SharedPipesModule {
}
