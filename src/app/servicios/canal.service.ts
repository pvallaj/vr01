import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanalService {
  /******************************************************************************************
  DESCRIPCIÓN:
    Clase que global que permite el intercambio de datos entre componentes "lejanos".
  ******************************************************************************************/
  private tc: string;
  public elemento: any;
  constructor() { }
  private subject = new Subject<any>();

    public sendMessage(message: string) {
      /******************************************************************************************
      DESCRIPCIÓN:
        Toma el mensaje y notifica que hay un nuevo mensaje.
      PARAMETROS:
        message. Es el mensaje a comunicar.
      ******************************************************************************************/
        this.subject.next({ text: message });
    }

    public clearMessages() {
      /******************************************************************************************
      DESCRIPCIÓN:
      Elimina los mensaje existentes.
      ******************************************************************************************/
        this.subject.next();
    }

    public getMessage(): Observable<any> {
      /******************************************************************************************
      DESCRIPCIÓN:
        Obtiene el último mensaje emitido.
      RESULTADO:
        El último mensaje emitido.
      ******************************************************************************************/
        return this.subject.asObservable();
    }

    set terminoConsulta(tc: string) {
      /******************************************************************************************
      DESCRIPCIÓN:
      Asigna una cadena de texto que será usada para una consulta, desde el buscador general.
      ******************************************************************************************/
      this.tc = tc;
    }

    get terminoConsulta(): string {
      /******************************************************************************************
      DESCRIPCIÓN:
      Obtiene la cadena de texto que será usada como termino de consulta.
      RESULTADO
      una cadena de texto.
      ******************************************************************************************/
      return this.tc;
    }
}
