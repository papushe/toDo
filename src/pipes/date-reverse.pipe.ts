import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateReverse'
})
export class DateReversePipe implements PipeTransform {

  // size(obj) {
  //   var size = 0, key;
  //   for (key in obj) {
  //     if (obj.hasOwnProperty(key)) size++;
  //   }
  //   return size;
  // };

  transform(array){

    if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }


  // transform(arr) {
  //   if(!arr) return;
  //   let copy = arr.slice();
  //   return copy.reverse();
  // }

}
