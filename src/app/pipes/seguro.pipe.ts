import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'seguro'
})
export class SeguroPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url):SafeHtml {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
