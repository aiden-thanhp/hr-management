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
      if (employee.profile?.firstName.toLowerCase().includes(args)) return true;
      else if (employee.profile?.lastName.toLowerCase().includes(args))
        return true;
      else if (employee.profile?.preferredName.toLowerCase().includes(args))
        return true;
      else return false;
    });
  }
}
