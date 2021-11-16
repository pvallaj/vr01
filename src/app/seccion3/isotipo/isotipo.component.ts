import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-isotipo',
  styleUrls: ['./isotipo.component.css'],
  templateUrl: './isotipo.component.html',
})
export class IsotipoComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Crea una ventana que muestra el ISOTIPO y su descripción.
  ******************************************************************************************/
  constructor() { }
  @Output() public cerrar = new EventEmitter<number>();
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

    this.cerrar.emit(0);
  }
}
