import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'last'
})
export class LastPipe implements PipeTransform {

  transform(value: any[]): any {
    if (value && value.length > 0) return value[value.length - 1];
    return value;
  }

}
