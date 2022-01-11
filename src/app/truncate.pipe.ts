import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, number: string): string {

    const result = `${value.slice(0, Number(number))}...`;

    return result;
  }

}
