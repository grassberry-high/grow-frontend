import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sensor'
})
export class SensorPipe implements PipeTransform {

  transform(input: any, sensorType?: any): any {
    // console.log('input #{input}', sensorType)
    if (!input) return null;
    switch (sensorType) {
      case 'water':
        switch (input) {
          case '3':
            return 'Wet';
          case '2':
            return 'Moist';
          case '1':
            return 'Dry';
          default:
            return input;
        }
      default:
        return input;
    }

  }

}
