import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'HtmlSeguro'
})
export class HtmlSeguroPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

}
