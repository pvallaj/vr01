import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'recortaTexto'
})
export class RecortaTextoPipe implements PipeTransform {
    transform(texto: string, tm: number): any {
        if(!texto) return null;
        if (texto.length > tm) {
            return texto.substring(0, texto.indexOf(' ', tm)) + '...';
        }
        return texto;
    }
}