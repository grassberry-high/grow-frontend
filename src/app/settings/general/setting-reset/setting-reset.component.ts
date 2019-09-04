import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config/config.service';

@Component({
  selector: 'app-setting-reset',
  templateUrl: './setting-reset.component.html',
  styleUrls: ['./setting-reset.component.scss']
})
export class SettingResetComponent implements OnInit {
  buttonDisabled = false;

  constructor(
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
  }

  reset(): void {
    this.configService.reset();
  }

}
