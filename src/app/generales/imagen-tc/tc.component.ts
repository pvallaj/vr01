import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Globales } from '../globales';
/*****************************************************************************************
  Descripción
    muestra una ventana con:
       La imagen en tamaño completo, 
       el detalle de una tarjeta de detalle de una consulta de la obra escrita 
       el detalle resultado de una consulta en la base de datos de relaciones o 
       el detalle resultado de una consulta en la base de datos de sermones
  Parametros
    referencia: 
        cuando el tipo es 'imagen noticia' Es la dirección URL para el caso de que sea una imagen.
        cuando el tipo es 'relacion' es el ID de la relación
        cuando el tipo es 'relacion' es el ID del sermon,
    tipo: 
        'imagen noticia' si queremos presentar una imagen
        'buscar' si queremos presentar el resultado de una busqueda en la obra escrita.
        'relacion' si se quiere presentar el detalle de una relación.
        'sermon' si se quiere presentar el detalle de un sermon.
    textoBuscado
        es la palabra buscada y se usa para resaltar los textos buscados.
    elemento:
        cuanto el parametro tipo='buscar', elemento es objeto contenido en la tarjeta 
        que selecciono el usuario.

  Eventos
    quitar. es un evento de tipo texto y se dispara cuando el usuario cierra la ventana.

  Version: 1.0
  fecha de liberación: 28/02/2021
  Registro de cambios:

******************************************************************************************/
@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.css']
})
export class TCComponent implements OnInit {
  @Input() referencia:string;
  @Input() tipo:string;
  @Input() textoBuscado:string="";
  @Input() elemento:any;
  
  @Output() quitar=new EventEmitter<number>();
  
  public rutaImgsNoticias:Globales=null;

  constructor() { 
    this.rutaImgsNoticias=Globales.rutaImgNoticias;
  }
  
  ngOnInit(): void {
    console.log('--------------------------------');
    console.log(this.referencia);
    console.log(this.tipo);
    console.log(this.elemento);
    console.log('--------------------------------');
  }
  public cerrar(){
    /*****************************************************************************************
      Descripción
        cierra la ventana construida por este componente
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/
    console.log("cerrar ..");
    this.quitar.emit(0);
  }

  public abrirCapitulo(idc:number){
    /*****************************************************************************************
      Descripción
        cierra la ventana construida por este componente y abre el capitulo seleccionado por el usuario.
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/
    console.log("cerrar con capitulo");
    this.quitar.emit(idc);
  }
}
