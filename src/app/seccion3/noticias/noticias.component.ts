import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Globales } from '../../generales/globales';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-noticias',
  styleUrls: ['./noticias.component.css'],
  templateUrl: './noticias.component.html',
})
export class NoticiasComponent  {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra una ventana con los detalles de una noticia.
  ******************************************************************************************/
  @Input() public noticia: any;

  @Output() public cerrarNoticia = new EventEmitter<string>();

  public imgSel = '';
  public listaNoticias: any = [];
  public estaCargando = false;
  public ruta = '';
  constructor(private cnx: ConexionService) {
    this.ruta = Globales.rutaImgNoticias;
  }

  public cerrar() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Cierra la ventana creada por este componente.
    ******************************************************************************************/
    this.cerrarNoticia.emit('cerrar');
  }

}
