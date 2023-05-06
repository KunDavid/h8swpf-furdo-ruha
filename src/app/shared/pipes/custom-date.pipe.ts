import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    let tz = new Date(value).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tz)).toISOString().replace('Z', ' ').replace('T', ' Magyar idő szerint ');
    return localISOTime;
  }

}
