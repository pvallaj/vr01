import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {

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
    console.log("cerrar ..");
    this.cerrar.emit('cerrar');
  }

}
