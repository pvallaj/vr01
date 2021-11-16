import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-presentacio-relaciones',
  styleUrls: ['./presentacio-relaciones.component.css'],
  templateUrl: './presentacio-relaciones.component.html',
})
export class PresentacioRelacionesComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra la pagina de presentación de la sección de "Herramienta de relaciones"
  ******************************************************************************************/

  @ViewChild('marca')
  public inputMessageRef: ElementRef;

  public secVisible = '';
  public vIsotipo = false;

  constructor() { }

  public ngOnInit(): void {

  }

  public moAyuda(seccion) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta y muestra la descripción de cada filtro existente es esta herramienta.
    ******************************************************************************************/

    if (this.secVisible === seccion) {

      this.secVisible = '';
    } else {

      this.secVisible = seccion;
    }

  }
}
