import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'HtmlSeguro',
})
export class HtmlSeguroPipe implements PipeTransform {
  /******************************************************************************************
  DESCRIPCIÓN:
  Permite verificar que código HTML es seguro, es decir, que no contiene código considerado malicioso.
  Esta validación es requerida por ANGULAR.
  ******************************************************************************************/
  constructor(private sanitizer: DomSanitizer) {}
  public transform(codigo): SafeHtml {
    /******************************************************************************************
    DESCRIPCIÓN
    Realiza el proceso de validación.

    PARAMETROS
    Codigo. Es el segmento de código HTML a verificar.

    RESULTADO
    El segmento de código sin las partes consideradas como riesgosas.
    ******************************************************************************************/
    return this.sanitizer.bypassSecurityTrustHtml(codigo);
  }

}
