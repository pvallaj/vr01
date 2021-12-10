import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacio-sermones',
  styleUrls: ['./presentacio-sermones.component.css'],
  templateUrl: './presentacio-sermones.component.html',
})
export class PresentacioSermonesComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Despliega la pantalla de presentación de sermones.
  ******************************************************************************************/
  public secVisible = '';
  public vIsotipo = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public moAyuda(seccion) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Oculta y muestra la descripción del filtro especificado por el nombre de la sección.
      En caso de que la descripción este oculta se mostrará y viceversa.
    PARAMETROS:
      seccion. es la sección de la cual se mostrara la ayuda.
    ******************************************************************************************/
    if (this.secVisible === seccion) {

      this.secVisible = '';
    } else {

      this.secVisible = seccion;
    }

  }

}
