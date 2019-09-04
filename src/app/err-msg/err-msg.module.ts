import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrMsgComponent} from './err-msg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrMsgComponent],
  exports: [ErrMsgComponent]
})
export class ErrMsgModule {
}
