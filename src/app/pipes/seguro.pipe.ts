import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'seguro',
})
export class SeguroPipe implements PipeTransform {
  /******************************************************************************************
  DESCRIPCIÓN:
  permite saniltizar las direcciones html. esto ayuda a que no exista codigo malicioso dentro de
  las direcciones url que se url utilizadas en este sitio.
  ******************************************************************************************/
  constructor(private sanitizer: DomSanitizer) {}
  public transform(url): SafeHtml {
    /******************************************************************************************
    DESCRIPCIÓN
    Realiza el proceso de validación.

    PARAMETROS
    url. Es dirección URL a verificar.

    RESULTADO
    La dirección URL si es valida o un texto sin las dirección URL.
    ******************************************************************************************/
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
