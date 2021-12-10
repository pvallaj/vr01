import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  styleUrls: ['./inicio.component.css'],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra la pantalla principal de la aplicación, construye las secciones principales de la pagina inicial.
  ******************************************************************************************/
  public mostrarLeerMas = false;
  public vLeerMas = false;
  public vIsotipo = false;
  public tLeerMas = 'Leer más';
  constructor() { }

  public ngOnInit(): void {
  }

  public acLeerMas() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Expande y contrae el cuadro de descripción de la página.

    PARAMETROS
    Ninguno.

    RESULTADO
    Ninguno.
    ******************************************************************************************/
    this.vLeerMas = !this.vLeerMas;
    this.tLeerMas = this.vLeerMas ? 'Leer menos' : 'Leer más';
  }

  public abrirIsotipo() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Abre la ventana que muestra la descripción del isotipo.

    PARAMETROS
    Ninguno.

    RESULTADO
    Ninguno.
    ******************************************************************************************/
    this.vIsotipo = true;
  }

  public cerrarIsotipo() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Cierra la ventana que muestra la descripción del isotipo.

    PARAMETROS
    Ninguno.

    RESULTADO
    Ninguno.
    ******************************************************************************************/
    this.vIsotipo = false;
  }
}
