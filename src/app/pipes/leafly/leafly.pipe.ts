import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'leafly'
})
export class LeaflyPipe implements PipeTransform {

  transform(strain: any): string {
    return strain.link || 'https://www.leafly.com/search?q=#{strain.name}&typefilter=strain';
  }

}
