import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'relayPipe'
})
export class RelayPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if (value === 1) {
      return 'on';
    } else {
      return 'off';
    }
  }

}
