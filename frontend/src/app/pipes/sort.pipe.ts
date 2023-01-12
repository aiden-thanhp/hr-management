import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return null;

    const sortedValue = [...value];

    return sortedValue.sort((a: any, b: any) => {
      let x = a?.profile?.firstName.toLowerCase();
      let y = b?.profile?.firstName.toLowerCase();

      if (x < y) return -1;
      else if (x > y) return 1;
      else return 0;
    });
  }
}
