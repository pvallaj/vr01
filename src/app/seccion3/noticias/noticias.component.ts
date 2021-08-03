import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { Globales } from '../../generales/globales';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  @Input() noticia: any;

  @Output() cerrarNoticia = new EventEmitter<string>();

  public imgSel = '';
  public listaNoticias: any = [];
  public estaCargando = false;
  public ruta = '';
  constructor(private cnx: ConexionService) { 
    this.ruta = Globales.rutaImgNoticias;
  }

  ngOnInit(): void {

  }
  cerrar(){
    this.cerrarNoticia.emit('cerrar');
  }

}
