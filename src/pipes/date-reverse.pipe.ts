import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateReverse'
})
export class DateReversePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(arr) {
    var copy = arr.slice();
    return copy.reverse();
  }
}
