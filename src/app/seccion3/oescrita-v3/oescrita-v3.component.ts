import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/Conexion.service';

@Component({
  selector: 'app-oescrita-v3',
  templateUrl: './oescrita-v3.component.html',
  styleUrls: ['./oescrita-v3.component.css']
})
export class OescritaV3Component implements OnInit {


  public estaCargando=false;
  public resultado:any[]=null;
  public imagenes:any[]=null;

  public regsCapitulo:any[]=null;
  public portada:any=null;

  public om_estructura=true;
  public om_detalle=true;
  public om_lista=true;
  public ctrlVisible=false;

  public elementoSeleccionado:any;
  public capituloSeleccionado=null;

  constructor(private cnx:ConexionService) { }

  ngOnInit(): void {
    this.estaCargando=true;
    this.cnx.novohisp({tomo:'SXVI'}, 'consulta estructura x tomo').subscribe(
      (datos) => {
        this.estaCargando=false;
        this.resultado=datos['resultado'].estructura;
        this.imagenes=datos['resultado'].imagenes;
    },(error) => {
      console.log('error al cargar a los autores');
      console.log(error);
    });
  }

  public verCapitulo(etiquetas:string){
    this.regsCapitulo=null;
    let listae=etiquetas.split(",");
    listae=listae.filter(e=>e.trim()!='estructura');
    this.capituloSeleccionado=listae.join(",");
    this.estaCargando=true;
    this.cnx.novohisp({capitulo:this.capituloSeleccionado}, 'consulta capitulo tomo').subscribe(
      (datos) => {
        this.estaCargando=false;
        this.regsCapitulo=datos['resultado'].capitulo;
        this.elementoSeleccionado=this.regsCapitulo[0];
    },(error) => {
      console.log('error al cargar a los autores');
      console.log(error);
    });
  }

  public verTomo(){
    this.capituloSeleccionado=null;
  }

  public regresar(){
    this.capituloSeleccionado=null;
    this.elementoSeleccionado=null;
    this.regsCapitulo=null;
  }

}
