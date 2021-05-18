import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-det-sld',
  templateUrl: './img-det-sld.component.html',
  styleUrls: ['./img-det-sld.component.css']
})
export class ImgDetSldComponent implements OnInit {

  @Input() elemento:any;
  
  @Output() quitar=new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
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
    this.quitar.emit('cerrar');
  }
  public imagenwidth=100;
  public aumentar(){
    this.imagenwidth+=10;
  }
  public disminuir(){
    this.imagenwidth-=10;
  }
}
