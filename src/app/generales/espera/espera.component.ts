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
  styleUrls: ['./espera.component.css'],
  templateUrl: './espera.component.html',
})
export class EsperaComponent implements OnInit {
@Input() public tipo = 1;
  constructor() { }

  public ngOnInit(): void {
  }

}
