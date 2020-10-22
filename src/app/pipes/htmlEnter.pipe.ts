import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlEnter'
})
export class HtmlEnterPipe implements PipeTransform {
  constructor() {}
  transform(texto:string) {
    return texto;
  }

}