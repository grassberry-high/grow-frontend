import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() titleYes = 'Yes';
  @Input() titleNo = 'No';
  @Input() inline = null;
  @Input() ngModel;
  @Output() ngModelChange;

  constructor() {
  }

  ngOnInit() {
  }

  make(value) {
    this.ngModel = value;
  }

}
