import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-setting-software',
  templateUrl: './setting-software.component.html',
  styleUrls: ['./setting-software.component.scss']
})
export class SettingSoftwareComponent implements OnInit {
  buttonDisabled = false;

  constructor(
    private configService: ConfigService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
  }

  // ---------------------------------- Software update -------------------------------------
  updateSoftware(): void {
    this.buttonDisabled = true;
    this.configService.updateSoftware().subscribe((results) => {
      this.buttonDisabled = false;
      if (results) this.toastrService.success(results, 'Softwareupdate');
    });
  }

}
