import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'resaltaTexto',
})
export class ResaltaTextoPipe implements PipeTransform {
  /******************************************************************************************
  DESCRIPCIÓN:
  Localiza las palabras que vienen dentro de args y les agrega un estilo para que resalten del resto.
  ******************************************************************************************/
  constructor(protected sanitizer: DomSanitizer) {}
  public transform(texto: string, args: string) {
    if (!args || args === '' || !texto || texto === '') { return texto; }
    let resultado = '';

    if (args.indexOf('+') > 0) {
      const textos = args.split('+');
      textos.forEach((el) => {
        const re = new RegExp(el.trim().replace(/['"]+/g, ''), 'gi');
        texto = texto.replace(re,
          '<mark style="padding: .2em;color: white;background-color: #f30303;text-decoration-line: underline;font-style: italic;border-radius: 5px;">$&</mark>'
          );
      });
      resultado = texto;
    } else {

      const re = new RegExp(args.trim().replace(/['"]+/g, ''), 'gi');
      resultado = texto.replace(re,
        '<mark style="padding: .2em;color: white;background-color: #f30303;text-decoration-line: underline;font-style: italic;border-radius: 5px;">$&</mark>'
        );
    }

    return this.sanitizer.bypassSecurityTrustHtml(resultado);
  }

}
