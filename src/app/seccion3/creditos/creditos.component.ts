import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-creditos',
  styleUrls: ['./creditos.component.css'],
  templateUrl: './creditos.component.html',
})
export class CreditosComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
    muestra una ventana con la información de los créditos de este proyecto, es decir, los
    participantes del proyecto.
  ******************************************************************************************/
  @Output() public cerrar = new EventEmitter<string>();
  constructor() { }

  public ngOnInit(): void {
  }

  public cerrarv() {
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
