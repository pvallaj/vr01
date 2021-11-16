import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'HtmlSeguro',
})
export class HtmlSeguroPipe implements PipeTransform {
  /******************************************************************************************
  DESCRIPCIÓN:
  permite saniltizar las direcciones html. esto ayuda a que no exista codigo malicioso dentro de
  las direcciones url que se url utilizadas en este sitio.
  ******************************************************************************************/
  constructor(private sanitizer: DomSanitizer) {}
  public transform(url): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

}
