import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioBtnGroupComponent} from './radio-btn-group/radio-btn-group.component';
import {FeedbackComponent} from './feedback.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrMsgModule} from '../err-msg/err-msg.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ErrMsgModule
  ],
  declarations: [
    FeedbackComponent,
    RadioBtnGroupComponent
  ],
  exports: [FeedbackComponent]
})
export class FeedbackModule {
}
