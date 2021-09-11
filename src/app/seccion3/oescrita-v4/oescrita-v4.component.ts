import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public capituloSel=null;

  public om_estructura=true;
  public om_detalle=true;
  public om_lista=true;
  public ctrlVisible=false;

  public elementoSeleccionado:any;

  public tipoReferencia:string=null;
  public referencia:string=null;

  public siglo:string="";
  public tomo:string="";

  constructor(private cnx:ConexionService, private ar:ActivatedRoute) {

    this.siglo=this.ar.snapshot.params.siglo;
    this.tomo=this.ar.snapshot.params.tomo;;
  }

  ngOnInit(): void {
    this.estaCargando=true;

    this.cnx.novohisp({tomo:this.siglo+'-'+this.tomo}, 'consulta estructura x tomo').subscribe(
      (datos) => {
        this.estaCargando=false;
        this.resultado=datos['resultado'].estructura;
        this.imagenes=datos['resultado'].imagenes;
        let seccionA="";
        for (let index = 0; index < this.resultado.length; index++) {
          const element = this.resultado[index];
          if(element.etiquetas.indexOf('seccion-')>=0){
            seccionA=element.etiquetas.split(',')[1];
          }else{
            element.etiquetas=element.etiquetas+', '+seccionA;
          }
        }

    },(error) => {

      console.log(error);
    });
  }

  public verCapitulo(elemento:any){
    if(elemento.etiquetas.indexOf('seccion')>=0 && elemento.etiquetas.indexOf('capitulo')<0) return;
    this.regsCapitulo=null;
    this.capituloSel=elemento;
    let etiquetas=elemento.etiquetas;
    let listae=etiquetas.split(",");
    listae=listae.filter(e=>e.trim()!='estructura');
    listae=listae.filter(e=>e.indexOf('seccion')<0);
    let capituloSeleccionado=listae.join(",");
  
    this.estaCargando=true;
    this.cnx.novohisp({capitulo:capituloSeleccionado}, 'consulta capitulo tomo').subscribe(
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

      console.log(error);
    });
  }

  public verTomo(){
    this.capituloSel=null;
  }

  
  public verDetalle(e:any){
    if(e.orden>1){
      let p=this.regsCapitulo.indexOf(e)+1;
      let pr=this.regsCapitulo.length-p+1;
      let idx=1;


      for(idx=1;idx<=this.regsCapitulo.length;idx++){
        if(idx<p){   
          this.regsCapitulo[idx-1].orden=pr+idx;
        }else{
          this.regsCapitulo[idx-1].orden=(idx-p+1);
        }
      }

      this.regsCapitulo=this.regsCapitulo.sort((n1,n2)=>n1.orden-n2.orden);

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
  private seccionesVisibles:string[]=[];
  public desplegarCapitulo(cp:any){
    /*****************************************************************************************
      Descripción
        determina si el capitulo se despliega en la barra lateral o no. 
      Parametros
        cp. Capitulo
      Resultado
        true/false  
    ******************************************************************************************/
      let resultado=false;
      let etiquetas:string=cp.etiquetas;
      if(etiquetas.indexOf('capitulo')<0) return false; //no es un capitulo, es una sección.
      for (const i of this.seccionesVisibles) {
        if(etiquetas.indexOf(i)>=0){
          return true;
        }
      }
    return false;
  }
  public estaExpandido(sec:string):boolean{
    let seccion=sec.split(",")[1];
    if(this.seccionesVisibles.indexOf(seccion)>=0)  return true;
    return false;
  }
  public moSeccion(sec:string){

    if(sec.indexOf('seccion')<0) return;
    let capitulo=sec.split(",")[1];
    if(this.seccionesVisibles.indexOf(capitulo)>=0){
      //esta visible y hay que quitarlo
      this.seccionesVisibles=this.seccionesVisibles.filter(e=>{return e.indexOf(capitulo)<0});
    }else{
      //no esta visible y hay que agregarlo
      this.seccionesVisibles.push(capitulo);
    }

  }
  public obtEstiloEstructura(reg:any):string{
    if(reg==null) return 'st2';
    if(this.capituloSel==null) return 'st2';
    if(reg.texto==this.capituloSel.texto) return 'seleccionado';
    return 'st2';
  }
}
