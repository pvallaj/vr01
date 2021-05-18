import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-oescrita-v4',
  templateUrl: './oescrita-v4.component.html',
  styleUrls: ['./oescrita-v4.component.css']
})
export class OescritaV4Component implements OnInit {

  public estaCargando=false;
  public resultado:any[]=null;
  public imagenes:any[]=null;

  public regsCapitulo:any[]=null;
  public portada:any=null;
  private capituloSel=null;

  public om_estructura=true;
  public om_detalle=true;
  public om_lista=true;
  public ctrlVisible=false;

  public elementoSeleccionado:any;
  public capituloSeleccionado=null;

  public tipoReferencia:string=null;
  public referencia:string=null;

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

  public verCapitulo(elemento:any){
    if(elemento.etiquetas.indexOf('seccion')>=0) return;
    this.regsCapitulo=null;
    this.capituloSel=elemento;
    let etiquetas=elemento.etiquetas;
    let listae=etiquetas.split(",");
    listae=listae.filter(e=>e.trim()!='estructura');
    this.capituloSeleccionado=listae.join(",");
    this.estaCargando=true;
    this.cnx.novohisp({capitulo:this.capituloSeleccionado}, 'consulta capitulo tomo').subscribe(
      (datos) => {
        this.estaCargando=false;
        this.regsCapitulo=datos['resultado'].capitulo;
        this.portada={...this.regsCapitulo[0]}
        this.regsCapitulo.splice(0,1);
        /*this.elementoSeleccionado=this.regsCapitulo[0];
        let orden=1;
        this.regsCapitulo.forEach(element => {
          element.orden=orden++;
        });*/

    },(error) => {
      console.log('error al cargar a los autores');
      console.log(error);
    });
  }

  public verTomo(){
    this.capituloSeleccionado=null;
  }

  
  public verDetalle(e:any){
    if(e.orden>1){
      let p=this.regsCapitulo.indexOf(e)+1;
      let pr=this.regsCapitulo.length-p+1;
      let idx=1;
      console.log(p, pr);

      for(idx=1;idx<=this.regsCapitulo.length;idx++){
        if(idx<p){   
          this.regsCapitulo[idx-1].orden=pr+idx;
        }else{
          this.regsCapitulo[idx-1].orden=(idx-p+1);
        }
      }
      console.log(this.regsCapitulo);
      this.regsCapitulo=this.regsCapitulo.sort((n1,n2)=>n1.orden-n2.orden);
      console.log(this.regsCapitulo);
    }else{
        this.tipoReferencia='buscar';
        this.referencia="varios";
        this.elementoSeleccionado=e;
      }
  }

  public cerrarDetalle(){
    this.tipoReferencia=null;
      this.referencia=null;
      this.elementoSeleccionado=null;
  }

  public indiceTarjeta(i:number):number{
    return 200-i;
  }

  public siguiente(){
    /*****************************************************************************************
      Descripción
        Permite avanzar al siguiente capitulo
      Parametros
        Ninguno
      Resultado
        Ninguno  
    ******************************************************************************************/
    let idxA=this.resultado.indexOf(this.capituloSel);
    if(idxA<this.resultado.length-1){
      let sig=this.resultado[idxA+1];
      if(sig.etiquetas.indexOf('seccion')>=0){
        this.verCapitulo(this.resultado[idxA+2]);
      }else{
        this.verCapitulo(this.resultado[idxA+1]);
      }
    }else{
      this.verTomo();
    }
  }
  public anterior(){
    /*****************************************************************************************
      Descripción
        Permite regresar al capitulo anterior
      Parametros
        Ninguno
      Resultado
        Ninguno  
    ******************************************************************************************/
        let idxA=this.resultado.indexOf(this.capituloSel);
        if(idxA>1){
          let ant=this.resultado[idxA-1];
          if(ant.etiquetas.indexOf('seccion')>=0){
            this.verCapitulo(this.resultado[idxA-2]);
          }else{
            this.verCapitulo(this.resultado[idxA-1]);
          }
        }else{
          this.verTomo();
        }
  }
}
