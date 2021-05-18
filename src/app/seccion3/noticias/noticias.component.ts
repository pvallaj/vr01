import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  
  @Input() noticia:any;

  @Output() cerrarNoticia=new EventEmitter<string>();

  public imgSel="";
  public listaNoticias:any=[];
  public estaCargando=false;
  constructor(private cnx:ConexionService) { }

  ngOnInit(): void {

  }
  cerrar(){
    this.cerrarNoticia.emit('cerrar');
  }

}
