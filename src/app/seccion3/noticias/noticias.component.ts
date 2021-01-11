import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  public imgSel="";
  public listaNoticias:any=[];
  public estaCargando=false;

  constructor(private cnx:ConexionService) { }

  ngOnInit(): void {
    this.estaCargando=true;
    this.cnx.noticias(null, 'obtener todas las noticias activas').subscribe(
      (datos) => {
        this.listaNoticias = datos['resultado'];
        this.estaCargando=false;
    },
    (error) => {
        console.log('error al cargar a las noticias');
        console.log(error);
        this.estaCargando=false;
    });
  }

  public seleccionarImagen(img){
    this.imgSel=img;
  }

  public cerrarImagen(){
    console.log("cerrando imagen");
    this.imgSel="";
  }

}
