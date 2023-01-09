import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((employee: any) => {
      if (employee.firstName.toLowerCase().includes(args)) return true;
      else if (employee.lastName.toLowerCase().includes(args)) return true;
      else if (employee.preferredName.toLowerCase().includes(args)) return true;
      else return false;
    });
  }
}
