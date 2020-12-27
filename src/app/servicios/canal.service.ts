import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private _tc:string;
  public elemento:any;
  constructor() { }
  private subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    set terminoConsulta(tc:string){
      this._tc=tc;
    }

    get terminoConsulta():string{
      return this._tc;
    }
}


