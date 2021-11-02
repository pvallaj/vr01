import { Component, Input, OnInit } from '@angular/core';
/*****************************************************************************************
    Descripción
         Bloquea la pantalla para evitar que el usuario tenga iteracciones con la aplicación,
         con el objetivo de que la aplicación obtenga información del servidor.
    Parametros
        tipo:
          1 para mostrar un circulo girando
          2 para mostrar una barra
******************************************************************************************/

@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})
export class EsperaComponent implements OnInit {
@Input() tipo:number=1;
  constructor() { }

  ngOnInit(): void {
  }

}
