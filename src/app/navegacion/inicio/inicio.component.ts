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
    this.vLeerMas = !this.vLeerMas;
    this.tLeerMas = this.vLeerMas ? 'Leer menos' : 'Leer más';
  }

  public abrirIsotipo() {
    this.vIsotipo = true;
  }

  public cerrarIsotipo() {
    this.vIsotipo = false;
  }
}
