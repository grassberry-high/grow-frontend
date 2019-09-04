import {Component, Input, OnInit} from '@angular/core';
import {RelayService} from '../../../../services/relay.service';
import {Relay} from '../../../../interfaces/interfaces';
import {findIndex} from 'lodash';
import {FormBuilder, FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-input-relay',
  templateUrl: './input-relay.component.html',
  styleUrls: ['./input-relay.component.scss']
})
export class InputRelayComponent implements OnInit {
  @Input() relay: FormControl;
  @Input() id: string; // TODO: check temp for building
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  name: FormControl;
  relayOptions: Relay[] = [];
  relaySelector: any;  // TODO: check temp for building
  private nameSubject: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private relayService: RelayService
  ) {
    this.name = this.formBuilder.control([null]);
    this.nameSubject.pipe(debounceTime(1000)).subscribe((change) => this.relayService.renameRelay(change._id, change.newName));
  }

  ngOnInit() {
    this.relay.valueChanges.subscribe((change: any) => {
      this.initRelayName();
    });

    this.relayService.relaysChanged.subscribe((relayOptions) => {
      this.relayOptions = relayOptions;
      this.initRelayName();
    });
  }

  // ------------------------------- Relays------------------------------
  initRelayName() {
    if (this.relay) {
      const index = findIndex(this.relayOptions, (relayOption) => {
        return this.relay.value === relayOption._id;
      });
      if (index !== -1) this.name.setValue(this.relayOptions[index].name);
    }
  }

  debouncedRename(_id, newName) {
    this.nameSubject.next({_id: _id, newName: newName});
  }
}

