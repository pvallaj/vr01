import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";


import { ConexionService } from '../../servicios/Conexion.service';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-consulta-narrativas',
  templateUrl: './consultaNarrativas.component.html',
  styleUrls: ['./consultaNarrativas.component.css']
})
export class ConsultaNarrativasComponent implements OnInit {
  public listaResultado:any[]=[];
  //autocomplete
  public acAutores = new FormControl();
  public listaAutores:any[]=[];
  public listaAutoresObras:any[]=[];
  public listaObras: any[]=[];
  public listaClasificacion: any[]=[];
  public listaTemas: any[]=[];
  public listaMotivos: any[]=[];
  public listaVersificaciones: any[]=[];
  public listaTipoAcciones: any[]=[];
  public listaSoporte: any[]=[];
  public listaDistancias: number[]=[0,10,20,50,100,200];



  public despResultado:string='block';
  public despDetalle:string='none';
  public desplegarDetalle=false;

  public frm:FormGroup;

  //paginación
  public pidx = 0; //Número de página.
  public ptam = 10; //tamaño de la pagina

  //seleccionar elemento
  public idxSeleccionado = 0;
  public narrativaSeleccionada = {};
  public idNarrativaSel = 0;

  //Cargando datos.
  public estaCargando = false;

  public textConsulta: string;

  //-----------------------------
  public fcAutores = new FormControl();
  public fcObras = new FormControl();
  // ----------------------------
  public filtrosActivos = new FormControl();
  public listaFiltros: any[] = [
    { filtro : 'Autor', descripcion: 'Descripción del filtro' },
    { filtro : 'Obra', descripcion: 'Descripción del filtro'},
    { filtro : 'Clasificación', descripcion: 'Descripción del filtro'},
    { filtro : 'Tema', descripcion: 'Descripción del filtro'},
    { filtro : 'Motivo', descripcion: 'Descripción del filtro'},
    { filtro : 'Tipo de Verso', descripcion: 'Descripción del filtro'},
    { filtro : 'Tipo de Accion', descripcion: 'Descripción del filtro'},
    { filtro : 'Soporte', descripcion: 'Descripción del filtro'},
    { filtro : 'Textos o Palabras', descripcion: 'Busqueda de palabras o textos en un espacio de N palabras'}];

  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog,
    private fb: FormBuilder) {
      this.filtrosActivos.setValue(['Autor']);
    }

  ngOnInit(): void {
    this.crearForma();

    this.cnx.narrativas(null, 'consulta catalogo base').subscribe(
      (datos)=>{
        this.listaAutores = datos['resultado'].autores;
        this.listaAutoresObras = datos['resultado'].obras;
        this.listaClasificacion = datos['resultado'].clasificacion;
        this.listaTemas = datos['resultado'].tema;
        this.listaMotivos = datos['resultado'].motivos;
        this.listaVersificaciones = datos['resultado'].versificacion;
        this.listaTipoAcciones = datos['resultado'].tipoaccion;
        this.listaSoporte = datos['resultado'].soporte;
        this.listaObras = this.listaAutoresObras;
    },
    (error)=>{
      console.log("error al cargar a los autores");
      console.log(error);
    })
  }

  public autorSeleccionado(sel){
    console.log("seleccionado: ");
    if ( sel.value === undefined) {
      this.listaObras = this.listaAutoresObras;
    } else {
      this.listaObras = this.listaAutoresObras.filter(elm => elm.autor === sel.value);
    }
  }

  public consulta(){
    this.estaCargando=true;

    console.log(this.frm.value);

    let p = {
      autor:          this.frm.value.autor,
      obra:           this.frm.value.obra,
      clasificacion:  this.frm.value.clasificacion,
      tema:           this.frm.value.tema,
      motivo:         this.frm.value.motivo,
      tipoVerso:      this.frm.value.tipoVerso,
      tipoAccion:     this.frm.value.tipoAccion,
      soporte:        this.frm.value.soporte,
      textos:         this.frm.value.textos,

      desde:          this.pidx*this.ptam,
      pagtam:         this.ptam
    };
    if( this.filtrosActivos.value.indexOf('Autor')>=0  && 
        this.filtrosActivos.value.indexOf('Obra')==-1 ){
      if(this.fcAutores.value?.length>1){
        let aa:string[]=this.fcAutores.value;
        let f:string[]=[];
        for(let i=0;i<aa.length;i++){
          f.push("'"+aa[i]+"'");
        }
        p.autor=f.join(',')
      }else{
        if(this.fcAutores.value)
          p.autor=this.fcAutores.value[0];
      }
      
    }

    if( this.filtrosActivos.value.indexOf('Obra')>=0  && 
        this.filtrosActivos.value.indexOf('Autor')==-1 ){
      if(this.fcObras.value?.length>1){
        let aa:string[]=this.fcObras.value;
        let f:string[]=[];
        for(let i=0;i<aa.length;i++){
          f.push("'"+aa[i]+"'");
        }
        p.obra=f.join(',')
      }else{
        if(this.fcObras.value)
          p.obra=this.fcObras.value[0];
      }
      
    }

    let temp:any[]=[];
    this.idxSeleccionado=0;
    console.log(p);
    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        this.listaResultado=data['resultado'];
        if(this.frm.value.textos){
          this.listaResultado=this.listaResultado.filter(lmnt =>this.filtraDistancia(lmnt.narratio));
        }
        this.listaResultado.forEach(lmnt => {
          lmnt.narratioRecortado=this.recortaNarrativa(lmnt.narratio);
        });
        this.estaCargando=false;
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )
  }
  private filtraDistancia(texto:string):boolean{
    let r1=true;
    let r2=true;
    let palabras:string[]=this.frm.value.textos.split('+',3);
    //console.log("Texto: "+texto);
    //console.log("Palabras: "+palabras.length);
    if(palabras.length>1){
      //console.log("-----D1");
      r1=this.estanEnDistancia(texto, palabras[0], palabras[1], this.frm.value.distancia);
    }
    //console.log("Palabras: "+palabras.length);
    if(palabras.length==3){
      //console.log("-----D2");
      r2=this.estanEnDistancia(texto, palabras[1], palabras[2], this.frm.value.distancia);
    }
    //console.log(r1+"-----"+r2);
    return r1&&r2;
  }
  private estanEnDistancia(texto:string="", palabra1:string="", palabra2:string="", distancia:number):boolean{
    let up1:number=0;
    let up2:number=0;
    
    if (distancia==0) return true;
    palabra1=palabra1.toLowerCase();
    palabra2=palabra2.toLowerCase();
    texto=texto.toLowerCase();

    up1=texto.indexOf(palabra1, up1);
    //console.log(palabra1+", "+palabra2+", "+up1+", "+up2 );
    while (up1>0 && up1<texto.length) {
      up2=texto.indexOf(palabra2, up2);
      //console.log(palabra1+", "+palabra2+", "+up1+", "+up2 );
      while(up2>0 && up2<texto.length){
        let ss:string[];
        //console.log(palabra1+", "+palabra2+", "+up1+", "+up2 );
        if(up1<up2){
          ss=texto.substr(up1+palabra1.length,up2-up1).split(' ');
        }
        else{
          ss=texto.substr(up2+palabra2.length,up1-up2).split(' ');
        }
        console.log(ss.length);
        if(ss.length<=distancia){
          return true;
        }
        up2=texto.indexOf(palabra2, up2+1);
      }
      up1=texto.indexOf(palabra1, up1+1);
    }
    return false;
  }
  public cambiar(seleccionado){
    
    this.desplegarDetalle=!this.desplegarDetalle;

    if (this.desplegarDetalle) {
      this.idNarrativaSel = seleccionado.id_texto;
      this.narrativaSeleccionada = seleccionado;
    } else {
      this.idNarrativaSel = 0;
      this.narrativaSeleccionada = null;
    }
  }


  crearForma(){
    this.frm=this.fb.group({
      //valor inicial, validaciones sincronas, validaciones asincronas
      autor: ['' ],
      clasificacion: [''],
      obra: ['' ],
      tema: ['' ],
      motivo: ['' ],
      tipoVerso: ['' ],
      tipoAccion: ['' ],
      soporte: ['' ],
      textos: ['' ],
      distancia: [0 ],
    });
  }
  cambioAutor(e){
    console.log(e);
    this.listaResultado=[];
  }

  cambioFiltros(e){
    console.log(e);
    console.log(this.filtrosActivos.value);
  }

  public recortaNarrativa(narrativa: string):string {
    if (narrativa.length > 300) {
      return narrativa.substring(0, narrativa.indexOf(' ', 300)) + '...';
    }
    return narrativa;
  }

}

