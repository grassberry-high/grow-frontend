import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AdvancedFormService} from '../advanced/advanced-form.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.scss']
})
export class QuickComponent implements OnInit {
  chambersForm: FormGroup;
  imagePath = 'assets/images/quick/';
  imagePaths = {
    basic: `${this.imagePath}card-basic.jpg`,
    advanced: `${this.imagePath}card-advanced.jpg`
  };

  constructor(
    private toastrService: ToastrService,
    private advancedFormService: AdvancedFormService
  ) {
    this.chambersForm = this.advancedFormService.buildChambersForm();
  }

  ngOnInit() {
  }

  addChamber() {
    this.toastrService.info('This service is under development', 'Available soon');
  }
}
