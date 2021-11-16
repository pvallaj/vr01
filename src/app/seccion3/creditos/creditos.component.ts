import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
    muestra una ventana con la información de los créditos de este proyecto, es decir, los
    participantes del proyecto.
  ******************************************************************************************/
  @Output() cerrar=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public cerrarv(){
    /*****************************************************************************************
      Descripción
        cierra la ventana construida por este componente
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/

    this.cerrar.emit('cerrar');
  }

}
