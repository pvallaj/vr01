import { Component, OnInit, ViewChild } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { SplitComponent, SplitAreaDirective } from 'angular-split'


@Component({
  selector: 'app-oescrita-v2',
  templateUrl: './oescrita-v2.component.html',
  styleUrls: ['./oescrita-v2.component.css']
})
export class OEscritaV2Component implements OnInit {

  @ViewChild('split') split: SplitComponent
  @ViewChild('area1') area1: SplitAreaDirective
  @ViewChild('area2') area2: SplitAreaDirective

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
        this.resultado=datos['resultado'].estructura;
        this.imagenes=datos['resultado'].imagenes;
    },(error) => {
      console.log('error al cargar a los autores');
      console.log(error);
    });
  }

  public verCapitulo(etiquetas:string){
    
    let listae=etiquetas.split(",");
    listae=listae.filter(e=>e.trim()!='estructura');
    this.capituloSeleccionado=listae.join(",");

    this.cnx.novohisp({capitulo:this.capituloSeleccionado}, 'consulta capitulo tomo').subscribe(
      (datos) => {
        this.regsCapitulo=datos['resultado'].capitulo;
        this.elementoSeleccionado=this.regsCapitulo[0];
    },(error) => {
      console.log('error al cargar a los autores');
      console.log(error);
    });
  }

  public regresar(){
    this.capituloSeleccionado=null;
    this.elementoSeleccionado=null;
  }

}
