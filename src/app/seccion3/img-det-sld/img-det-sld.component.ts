import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img-det-sld',
  styleUrls: ['./img-det-sld.component.css'],
  templateUrl: './img-det-sld.component.html',
})
export class ImgDetSldComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra una ventana emergente con el detalle de la imagen seleccionada, dentro del carrusel
  de imagenes.
  ******************************************************************************************/
  public imagenwidth = 100;
  public ligas: string[] = null;
  @Input() public elemento: any;

  @Output() public quitar = new EventEmitter<string>();

  constructor() {

  }

  public ngOnInit(): void {

  }

  public cerrar() {
    /*****************************************************************************************
      Descripción
        Cierra la ventana construida por este componente
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/

    this.quitar.emit('cerrar');
  }
  public aumentar() {
    this.imagenwidth += 10;
  }
  public disminuir() {
    this.imagenwidth -= 10;
  }
}
