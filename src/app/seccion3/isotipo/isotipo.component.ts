import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-isotipo',
  templateUrl: './isotipo.component.html',
  styleUrls: ['./isotipo.component.css']
})
export class IsotipoComponent implements OnInit {

  constructor() { }
  @Output() cerrar=new EventEmitter<number>();
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
    console.log("cerrar ventana");
    this.cerrar.emit(0);
  }
}
