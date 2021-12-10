import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'recortaTexto',
})
export class RecortaTextoPipe implements PipeTransform {
  /******************************************************************************************
  DESCRIPCIÓN:
  Recorta el texto al tamaño indicado por el parametro tm
  ******************************************************************************************/
    public transform(texto: string, tm: number): any {
    /******************************************************************************************
    DESCRIPCIÓN
    Realiza el recorte de la cadena.

    PARAMETROS
    texto. Es el texto a recortar.
    tm. es el tamaño maximo del texto a recortar.

    RESULTADO
    Una cadena que es un aporcion de la cadena original y cuyo tamaño maximo es el definido.
    ******************************************************************************************/
        if ( !texto ) {return null; }
        if (texto.length > tm) {
            return texto.substring(0, texto.indexOf(' ', tm)) + '...';
        }
        return texto;
    }
}
