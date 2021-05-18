import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-busq-avanzada',
  templateUrl: './busq-avanzada.component.html',
  styleUrls: ['./busq-avanzada.component.css']
})
export class BusqAvanzadaComponent implements OnInit {
  
  public filtros={
    autor:false,
    obra:false,
    clasificacion:false,
    tema:false,
    motivo:false,
    tipoVerso:false,
    tipoAccion:false,
    soporte:false,
    texto:false,
    signos:false
  }
  public tipo:string='individuales';

  constructor(public dialogRef: MatDialogRef<BusqAvanzadaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit(): void {
    console.log(this.datos);
    let fa=this.datos.filtros.value;
    console.log(fa.indexOf('Autor'));
    if(fa.indexOf('Signos Actorales')>=0){
      this.tipo='signos';
      this.filtros.autor=false;
      this.filtros.obra=false;
      this.filtros.clasificacion=false;
      this.filtros.tema=false;
      this.filtros.tipoVerso=false;
      this.filtros.tipoAccion=false;
      this.filtros.soporte=false;
      this.filtros.texto=false;
    }else{
      this.tipo='individuales';
      this.filtros.autor=           fa.indexOf('Autor')>=0?true:false;
      this.filtros.obra=            fa.indexOf('Obra')>=0?true:false;
      this.filtros.clasificacion=   fa.indexOf('Clasificación')>=0?true:false;
      this.filtros.tema=            fa.indexOf('Tema')>=0?true:false;
      this.filtros.motivo=          fa.indexOf('Motivo')>=0?true:false;
      this.filtros.tipoVerso=       fa.indexOf('Tipo de Verso')>=0?true:false;
      this.filtros.tipoAccion=      fa.indexOf('Tipo de Acción')>=0?true:false;
      this.filtros.soporte=         fa.indexOf('Soporte')>=0?true:false;
      this.filtros.texto=           fa.indexOf('Textos o Palabras')>=0?true:false;

    }
  }
  public tipos(e){
    if(this.tipo=='signos'){
      this.filtros.autor=false;
      this.filtros.obra=false;
      this.filtros.clasificacion=false;
      this.filtros.tema=false;
      this.filtros.motivo=false;
      this.filtros.tipoVerso=false;
      this.filtros.tipoAccion=false;
      this.filtros.soporte=false;
      this.filtros.texto=false;
    }
  }
  public aceptar(){
    if(this.tipo=='signos'){
      this.datos.filtros.value=['Signos Actorales'];
      return;
    }

    if(this.tipo=='vinculos'){
      this.datos.filtros.value=['Vinculos'];
      return;
    }

    if(this.tipo=='contexto'){
      this.datos.filtros.value=['Contexto'];
      return;
    }

    this.datos.filtros.value=[];
    if(this.filtros.autor)          this.datos.filtros.value.push('Autor');
    if(this.filtros.obra)           this.datos.filtros.value.push('Obra');
    if(this.filtros.clasificacion)  this.datos.filtros.value.push('Clasificación');
    if(this.filtros.tema)           this.datos.filtros.value.push('Tema');
    if(this.filtros.motivo)         this.datos.filtros.value.push('Motivo');
    if(this.filtros.tipoVerso)      this.datos.filtros.value.push('Tipo de Verso');
    if(this.filtros.tipoAccion)     this.datos.filtros.value.push('Tipo de Acción');
    if(this.filtros.soporte)        this.datos.filtros.value.push('Soporte');
    if(this.filtros.texto)          this.datos.filtros.value.push('Textos o Palabras');
    
  }
  public cancelar(){

  }

  public secVisible='';

  public moAyuda(seccion){
    //console.log(this.secVisible);
    //console.log(seccion);
    if(this.secVisible==seccion){
      //console.log('limpiando');
      this.secVisible='';
    }else{
      //console.log('asignando');
      this.secVisible=seccion;
    }
    //console.log(this.secVisible);
  }

}
