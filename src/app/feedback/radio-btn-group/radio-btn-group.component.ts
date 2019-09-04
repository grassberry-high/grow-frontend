import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-radio-btn-group',
  templateUrl: './radio-btn-group.component.html',
  styleUrls: ['./radio-btn-group.component.scss']
})
export class RadioBtnGroupComponent implements OnInit {
  @Input() form: FormControl;
  @Input() name;
  @Input() label;
  @Input() radioOptions;
  @Input() otherInput;
  @Input() otherInline;
  @Input() break;

  constructor() {
  }

  ngOnInit() {
  }

}
