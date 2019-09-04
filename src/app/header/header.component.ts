import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import * as moment from 'moment';

import {System} from 'src/app/interfaces/interfaces';
import {SystemService} from 'src/app/services/system.service';
import {DeveloperService} from 'src/app/services/developer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: any;
  system: System;
  lastConnect: Date;

  constructor(
    private _router: Router,
    private systemService: SystemService,
    private developerService: DeveloperService,
    private hotkeysService: HotkeysService
  ) {
    // ------------------------- hotkeys ----------------------------------------
    this.hotkeysService.add(new Hotkey('alt+ctrl+d', (event: KeyboardEvent): boolean => {
      developerService.toggleDeveloperMode();
      return false; // Prevent bubbling
    }, undefined, 'Show developer mode.'));
    this.router = _router;
    this.systemService.systemChange.subscribe((system) => {
      this.system = system;
      this.updateLastConnect();
    });
  }

  ngOnInit() {
    this.checkLicense();
    this.getSystem();
  }

  getSerial() {
    if (this.system && this.system.serial) {
      return this.system.serial;
    }
  }

  checkLicense() {
    this.systemService.checkLicense().subscribe((system: System) => {
      this.system = system;
      this.updateLastConnect();
    });
  }

  updateLastConnect() {
    if (this.system && this.system.lastConnect) {
      this.lastConnect = this.system.lastConnect;
    }
  }

  reboot() {
    this.systemService.reboot();
  }

  showFeedback() {
    // console.log(this.router)
    // return $state.current.name !== 'root.feedback'
  }


  // $rootScope.$on("loggedIn", ()->
  //   $timeout this.getUser()
  //   ,100
  // )

  // $rootScope.$on('loggedOut', (event) ->
  //   this.user = {}
  // )

  // $rootScope.$on "socket:system", (event, data) ->
  //   if data.id === 'update'
  //     BootstrapDialog.alert({
  //       title: data.title,
  //       message: data.message,
  //       type: BootstrapDialog.TYPE_INFO
  //     })


  // hotkeys.add({
  //   combo: 'alt+ctrl+d',
  //   description: 'Show developer mode',
  //   callback: () ->
  //     developer = $cookies.get('developer') === 'true'
  //     $cookies.put('developer', !developer)
  //     return

  // })
  getSystem() {
    this.systemService.getSystem();
  }

}
