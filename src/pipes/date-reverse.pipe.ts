import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateReverse'
})
export class DateReversePipe implements PipeTransform {

  transform(arr) {
    if(!arr) return;
    let copy = arr.slice();
    return copy.reverse();
  }

}
