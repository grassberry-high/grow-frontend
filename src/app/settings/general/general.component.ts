import {Component, OnInit} from '@angular/core';
import {SystemService} from '../../services/system.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  system: any = {
    region: 'US (Common)',
    dateTime: new Date(),
    units: {temperature: 'celsius'}
  };

  constructor(
    private systemService: SystemService
  ) {
    this.systemService.systemChange.subscribe((system) =>
      this.system = system
    );
  }

  ngOnInit() {
    this.systemService.getSystem();
  }

}
