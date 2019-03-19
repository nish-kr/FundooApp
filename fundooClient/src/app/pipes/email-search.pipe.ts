import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailSearch'
})
export class EmailSearchPipe implements PipeTransform {

  transform(items: any[], searchText?: any): any {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.toLowerCase().includes(searchText);
    });
  }
}