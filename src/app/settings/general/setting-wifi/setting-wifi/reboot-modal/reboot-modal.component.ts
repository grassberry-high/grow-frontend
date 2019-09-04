import {IModalDialog, IModalDialogOptions} from 'ngx-modal-dialog';
import {Component, ComponentRef} from '@angular/core';
import {WebsocketService} from '../../../../../services/websocket.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './reboot-modal.component.html',
  styleUrls: ['./reboot-modal.component.scss']
})
export class RebootModalComponent implements IModalDialog {
  parentInfo: string;
  systemData: any;

  constructor(
    private websocketService: WebsocketService
  ) {
    this.websocketService.systemData.subscribe((systemData: any) => {
      this.systemData = systemData;
      console.log("systemData", systemData);
    });
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    this.parentInfo = options.data;
  }
}
