import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CanalService } from './servicios/canal.service';

@Component({
  encapsulation : ViewEncapsulation.None,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  /******************************************************************************************
    DESCRIPCIÓN:
    Este es el componente principal de la aplicación. A partir de este componente se generan
    todos los restantes.
    En este componente se define el encabezado y el pie de pagina.
    El resto de la aplicación se genera dinamicamente.
  ******************************************************************************************/
  public title = 'texlit';
  public showFiller = false;

  public txtbuscar: string;
  public bexacta = true;
  public vIsotipo = false;
  public vCreditos = false;
  constructor(public r: Router, private cc: CanalService) {

  }

  public buscarTermino() {
    /*****************************************************************************************
      Descripción
        El usuario ha presionado ENTER en la caja de buscar o ha dado
        CLICK en el botón "BUSCAR", lo que indica que desea hacer una consulta.
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/
    this.cc.terminoConsulta = this.txtbuscar;

    this.cc.sendMessage(this.txtbuscar);

    this.r.navigate(['/buscar']);
  }

}
