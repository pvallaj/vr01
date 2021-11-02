import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:

  Este componente dibuja la presentación de las herramientas de consulta, tanto de la
  herramienta de sermones, como la herramientas de relaciones. al mismo tiempo presenta
  la ligas de acceso para ambas herramientas

  Este componente no requiere parámetros y no tiene eventos ni procedimientos.

  ******************************************************************************************/
  constructor(private r:Router) { }

  ngOnInit(): void {

  }

  public irASermones(){
    /******************************************************************************************
    DESCRIPCIÓN:
      Liga de la página de presentación a la herramienta de sermones
    PARAMETROS:
      Ninguno.
    ******************************************************************************************/
    this.r.navigate(['sermones']);
  }

  public irARelaciones(){
    /******************************************************************************************
    DESCRIPCIÓN:
      Liga de la página de presentación a la herramienta de relaciones.
    PARAMETROS:

    ******************************************************************************************/
    this.r.navigate(['relaciones']);
  }

}
