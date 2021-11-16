import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanalService {
  /******************************************************************************************
  DESCRIPCIÓN:
    Clase que global que permite el intecambio de datos entre componentes "lejanos".
  ******************************************************************************************/
  private _tc: string;
  public elemento: any;
  constructor() { }
  private subject = new Subject<any>();

    public sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    public clearMessages() {
        this.subject.next();
    }

    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    set terminoConsulta(tc: string) {
      this._tc = tc;
    }

    get terminoConsulta(): string {
      return this._tc;
    }
}
