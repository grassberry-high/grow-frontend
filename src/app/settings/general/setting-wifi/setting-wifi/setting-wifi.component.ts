import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {FormGroup} from '@angular/forms';
import {WifiFormService} from './wifi-form.service';
import {ModalDialogService} from 'ngx-modal-dialog';
import {RebootModalComponent} from './reboot-modal/reboot-modal.component';
import {ModalDialogInstanceService} from 'ngx-modal-dialog/src/modal-dialog-instance.service';

@Component({
  selector: 'app-setting-wifi',
  templateUrl: './setting-wifi.component.html',
  styleUrls: ['./setting-wifi.component.scss']
})
export class SettingWifiComponent implements OnInit {
  @Input() wifi: any;
  wifiForm: FormGroup;
  inputType = 'password';
  buttonDisabled = false;
  wifiOptions: any = [];
  showManualWifi = false;

  constructor(
    private configService: ConfigService,
    private wifiFormService: WifiFormService,
    private modalDialogService: ModalDialogService,
    private viewContainer: ViewContainerRef,
    private modalDialogInstanceService: ModalDialogInstanceService
  ) {
    configService.wifiOptionsChange.subscribe((wifiOptions) => {
      console.log(wifiOptions);
      this.wifiOptions = wifiOptions;
    });
  }

  ngOnInit() {
    this.wifiForm = this.wifiFormService.createWifiForm();
    this.getWifiOptions();
  }

// ------------------------------------ wifi ---------------------------------------
  toggleShowPassword(): void {
    this.inputType === 'password' ? this.inputType = 'text' : this.inputType = 'password';
  }

  getWifiOptions(): void {
    this.configService.getWifiOptions();
  }

  toggleShowManualWifi(): void {
    this.showManualWifi = !this.showManualWifi;
  }

  configureWifi(): void {
    if (!this.wifiForm.valid) return;
    this.buttonDisabled = true;
    this.openRebootModal();
    this.configService.configureWifi(this.wifiForm.value).subscribe((success) => {
      if (!success) {
        this.buttonDisabled = false;
        this.modalDialogInstanceService.closeAnyExistingModalDialog();
      }
    });
  }

  openRebootModal(parentSelector?) {
    this.modalDialogService.openDialog(this.viewContainer, {
      childComponent: RebootModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close'
      }
    });
  }

}
