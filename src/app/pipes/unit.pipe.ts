import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(unit: string, input: string): string {
    let map: object;
    switch (unit) {
      case 'temperature':
        map = {
          celsius: 'C',
          fahrenheit: 'F'
        };
        return map[input] || input;
      default:
        return input;
    }
  }
}
