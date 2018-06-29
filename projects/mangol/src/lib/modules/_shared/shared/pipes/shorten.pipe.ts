import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limitTo: number): any {
    if (value.length > limitTo) {
      return value.substr(0, limitTo) + ' ...';
    } else {
      return value;
    }
  }
}
