import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-busq-avanzada-s',
  templateUrl: './busq-avanzada-s.component.html',
  styleUrls: ['./busq-avanzada-s.component.css']
})
export class BusqAvanzadaSComponent implements OnInit {

  public filtros={
    autor:false,
    titulo:false,
    thema:false,
    anio:false,
    ranios:false,
    impresor:false,
    preliminares:false,
    dedicatarios:false,
    ciudad:false,
    obra:false,
    orden:false,
    grabado:false
  }
  public tipo:string='individuales';
  public fanios=false;
  public tipoAnios:string;

  constructor(public dialogRef: MatDialogRef<BusqAvanzadaSComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit(): void {
    console.log(this.datos);
    let fa=this.datos.filtros.value;
    console.log(fa.indexOf('Autor'));
    
      this.tipo='individuales';
      this.filtros.autor=           fa.indexOf('Autor')>=0?true:false;
      this.filtros.obra=            fa.indexOf('Obra')>=0?true:false;
      this.filtros.titulo=          fa.indexOf('Titulo')>=0?true:false;
      this.filtros.impresor=        fa.indexOf('Impresor')>=0?true:false;
      this.filtros.preliminares=    fa.indexOf('Preliminares')>=0?true:false;
      this.filtros.dedicatarios=    fa.indexOf('Dedicatarios')>=0?true:false;
      this.filtros.ciudad=          fa.indexOf('Ciudad')>=0?true:false;
      this.filtros.orden=           fa.indexOf('Orden')>=0?true:false;
      this.filtros.thema=           fa.indexOf('Thema')>=0?true:false;
      this.filtros.grabado=         fa.indexOf('Grabado')>=0?true:false;

      if(fa.indexOf('Año')>=0){
        this.fanios=true;
        this.tipoAnios="anio"  
      } 
      if(fa.indexOf('Rango de años')>=0){
        this.fanios=true;
        this.tipoAnios="anios"  
      } 


  }

  public aceptar(){
      this.datos.filtros.value=[];
      if(this.filtros.autor)          this.datos.filtros.value.push('Autor');
      if(this.filtros.obra)           this.datos.filtros.value.push('Obra');
      if(this.filtros.titulo)         this.datos.filtros.value.push('Titulo');
      if(this.filtros.impresor)       this.datos.filtros.value.push('Impresor');
      if(this.filtros.preliminares)   this.datos.filtros.value.push('Preliminares');
      if(this.filtros.dedicatarios)   this.datos.filtros.value.push('Dedicatarios');
      if(this.filtros.ciudad)         this.datos.filtros.value.push('Ciudad');
      if(this.filtros.orden)          this.datos.filtros.value.push('Orden');
      if(this.filtros.thema)          this.datos.filtros.value.push('Thema');
      if(this.filtros.grabado)        this.datos.filtros.value.push('Grabado');
      if(this.fanios){
        if(this.tipoAnios=="anio")
          this.datos.filtros.value.push('Año');
        else
          this.datos.filtros.value.push('Rango de años');
      }
      
  }

  public secVisible='';

  public moAyuda(seccion){
    console.log(this.secVisible);
    console.log(seccion);
    if(this.secVisible==seccion){
      console.log('limpiando');
      this.secVisible='';
    }else{
      console.log('asignando');
      this.secVisible=seccion;
    }
    console.log(this.secVisible);
  }
  
}
