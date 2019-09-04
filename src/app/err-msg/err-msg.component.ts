import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-err-msg',
  templateUrl: './err-msg.component.html',
  styleUrls: ['./err-msg.component.scss']
})
export class ErrMsgComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;
  @Input() errMsg: string;
  @Input() errType: string;

  constructor() {
  }

  ngOnInit() {
  }

  hasError() {
    if (!this.form || !this.form.get(name) || !this.form.get(name).errors) return false;
    if (this.errType) {
      return this.form.get(name).errors[this.errType];
    } else {
      return this.form.get(name).errors;
    }
  }
}
