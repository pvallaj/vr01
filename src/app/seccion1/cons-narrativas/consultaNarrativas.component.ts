import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from "@angular/forms";


import { ConexionService } from '../../servicios/Conexion.service';

import { MatDialog } from '@angular/material/dialog';
import { BusqAvanzadaComponent } from '../busq-avanzada/busq-avanzada.component';


@Component({
  selector: 'app-consulta-narrativas',
  templateUrl: './consultaNarrativas.component.html',
  styleUrls: ['./consultaNarrativas.component.css']
})
export class ConsultaNarrativasComponent implements OnInit {
  
  @ViewChild('marcaNarrativas') mNarrativa: any;

  public listaResultado:any[]=null;
  public listaResultadoSA:any[]=null;
  public listaResultadoV:any[]=null;
  public listaResultadoC:any[]=null;
  public totalRegistros=0;
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
  public vTextos:string='';
  
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

  
  
  //------------------------------
  public filtrosActivos = new FormControl();
  public listaFiltros: any[] = [
    { filtro : 'Autor', descripcion: 'Descripción del filtro' },
    { filtro : 'Obra', descripcion: 'Descripción del filtro'},
    { filtro : 'Clasificación', descripcion: 'Descripción del filtro'},
    { filtro : 'Tema', descripcion: 'Descripción del filtro'},
    { filtro : 'Motivo', descripcion: 'Descripción del filtro'},
    { filtro : 'Tipo de Verso', descripcion: 'Descripción del filtro'},
    { filtro : 'Tipo de Acción', descripcion: 'Descripción del filtro'},
    { filtro : 'Soporte', descripcion: 'Descripción del filtro'},
    { filtro : 'Textos o Palabras', descripcion: 'Busqueda de palabras o textos en un espacio de N palabras'},
    { filtro : 'Signos Actorales', descripcion: 'Descripción del filtro'},];

  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog,
    private fb: FormBuilder) {
      this.filtrosActivos.setValue(['Autor','Obra', 'Textos o Palabras']);
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

      console.log(error);
    })

    //this.consulta_inicial();

    this.mNarrativa.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); 
  }

  public autorSeleccionado(sel){

    if ( sel.value === undefined) {
      this.listaObras = this.listaAutoresObras;
    } else {
      this.listaObras = this.listaAutoresObras.filter(elm => elm.autor === sel.value);
    }
  }

  public consulta(){
    this.estaCargando=true;

    let p = {
      autor:          this.filtroActivo('Autor')?this.frm.value.autor:'',
      obra:           this.filtroActivo('Obra')?this.frm.value.obra:'',
      clasificacion:  this.filtroActivo('Clasificación')?this.frm.value.clasificacion:'',
      tema:           this.filtroActivo('Tema')?this.frm.value.tema:'',
      motivo:         this.filtroActivo('Motivo')?this.frm.value.motivo:'',
      tipoVerso:      this.filtroActivo('Tipo de Verso')?this.frm.value.tipoVerso:'',
      tipoAccion:     this.filtroActivo('Tipo de Accion')?this.frm.value.tipoAccion:'',
      soporte:        this.filtroActivo('Soporte')?this.frm.value.soporte:'',
      textos:         this.filtroActivo('Textos o Palabras')?this.frm.value.textos:'',

      desde:          this.pidx*this.ptam,
      pagtam:         this.ptam
    };
    if( this.filtroActivo('Autor')  &&  !this.filtroActivo('Obra') ){
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

    if( this.filtroActivo('Obra')  && !this.filtroActivo('Autor') ){
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
    var re = /\+/gi; 
    p.textos=p.textos.replace(re, "$"); 

    let temp:any[]=[];
    this.idxSeleccionado=0;

    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        this.listaResultado=data['resultado'].registros;
        this.totalRegistros=data['resultado'].conteo[0].total;
        if(this.frm.value.textos){
          this.listaResultado=this.listaResultado.filter(lmnt =>this.filtraDistancia(lmnt.narratio));
        }
        this.listaResultado.forEach(lmnt => {
          let termino=this.frm.value.textos;

          lmnt.narratioRecortado=this.recortaNarrativa(lmnt.narratio,termino,300);
        });
        this.estaCargando=false;
      },
    (error)=>{
        console.error(error);
        this.estaCargando=false;
      }
    )
  }

  public consulta_inicial(){
    this.estaCargando=true;

    let p = {
      autor:          '',
      obra:           '',
      clasificacion:  '',
      tema:           '',
      motivo:         '',
      tipoVerso:      '',
      tipoAccion:     '',
      soporte:        '',
      textos:         '',

      desde:          this.pidx*this.ptam,
      pagtam:         this.ptam
    };
    
    

    let temp:any[]=[];
    this.idxSeleccionado=0;


    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        this.listaResultado=data['resultado'].registros;
        this.totalRegistros=data['resultado'].conteo[0].total;
        if(this.frm.value.textos){
          this.listaResultado=this.listaResultado.filter(lmnt =>this.filtraDistancia(lmnt.narratio));
        }
        this.listaResultado.forEach(lmnt => {
          let termino=this.frm.value.textos;

          lmnt.narratioRecortado=this.recortaNarrativa(lmnt.narratio,termino,300);
        });
        this.estaCargando=false;
      },
    (error)=>{
        console.error(error);
        this.estaCargando=false;
      }
    )
  }

  private filtraDistancia(texto:string):boolean{
    let r1=true;
    let r2=true;
    let palabras:string[]=this.frm.value.textos.split('+',3);
    if(palabras.length>1){
      r1=this.estanEnDistancia(texto, palabras[0], palabras[1], this.frm.value.distancia);
    }
    if(palabras.length==3){
      r2=this.estanEnDistancia(texto, palabras[1], palabras[2], this.frm.value.distancia);
    }
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
    while (up1>0 && up1<texto.length) {
      up2=texto.indexOf(palabra2, up2);
      while(up2>0 && up2<texto.length){
        let ss:string[];
        if(up1<up2){
          ss=texto.substr(up1+palabra1.length,up2-up1).split(' ');
        }
        else{
          ss=texto.substr(up2+palabra2.length,up1-up2).split(' ');
        }
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
    this.idNarrativaSel = seleccionado.id_texto;
    this.narrativaSeleccionada = seleccionado;

    /*this.desplegarDetalle=!this.desplegarDetalle;

    if (this.desplegarDetalle) {
      this.idNarrativaSel = seleccionado.id_texto;
      this.narrativaSeleccionada = seleccionado;
    } else {
      this.idNarrativaSel = 0;
      this.narrativaSeleccionada = null;
    }*/
  }
  cerrarDetalle(){
    this.idNarrativaSel = 0;
    this.narrativaSeleccionada = null;
  }

  crearForma(){
    this.frm=this.fb.group({
      //valor inicial, validaciones sincronas, validaciones asincronas
      autor: ['' ],
      obra: ['' ],
      clasificacion: [''],
      tema: ['' ],
      motivo: ['' ],
      tipoVerso: ['' ],
      tipoAccion: ['' ],
      soporte: ['' ],
      textos: ['' ],
      distancia: [0 ],
    });
    this.frm.valueChanges.subscribe((v)=>{

      this.listaResultado=null;
      if(this.filtroActivo("Autor")) {
        this.listaObras = this.listaAutoresObras;
      };
    });
    this.fcAutores.valueChanges.subscribe((v)=>{

      this.listaResultado=null;
    });
    this.fcObras.valueChanges.subscribe((v)=>{

      this.listaResultado=null;
    });
    this.filtrosActivos.valueChanges.subscribe((v)=>{

      if(this.filtroActivo('Signos Actorales')){
        
        this.filtrosActivos.setValue(['Signos Actorales'],{emitEvent:false})        
      }
      this.listaResultado=null;
    });
  }

  public filtroActivo(f:string):boolean{
    if(this.filtrosActivos.value.indexOf(f)==-1) return false;
    return true;
  }

  public abrirBusquedaAvanzada(){
    this.listaResultadoSA=null;
    this.listaResultadoV=null;
    this.listaResultadoC=null;
    this.listaResultado=null
    const dialogRef = this.dialog.open(BusqAvanzadaComponent, {
      data: {filtros:this.filtrosActivos}
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if(this.filtroActivo('Signos Actorales')){
        this.listaResultado=null;
        this.buscarSignosActorales();
        return;
      }
      if(this.filtroActivo('Vinculos')){
        this.listaResultado=null;
        this.buscarVinculos();
        return;
      }

      if(this.filtroActivo('Contexto')){
        this.listaResultado=null;
        this.buscarContexto();
        return;
      }

    });
  }

  private buscarSignosActorales(){
    let p=null;
    this.estaCargando=true;
    this.cnx.narrativas(p, 'consulta signos actorales')
    .subscribe(
      (data)=>{
        this.listaResultadoSA= data['resultado'];
        this.estaCargando=false;
      },
    (error)=>{

        console.error(error);
        this.estaCargando=false;
      }
    )
  }

  private buscarVinculos(){
    let p=null;
    this.estaCargando=true;
    this.cnx.narrativas(p, 'consulta vinculos')
    .subscribe(
      (data)=>{
        this.listaResultadoV= data['resultado'];
        this.estaCargando=false;
      },
    (error)=>{

        console.error(error);
        this.estaCargando=false;
      }
    )
  }
  
  private buscarContexto(){
    let p=null;
    this.estaCargando=true;
    this.cnx.narrativas(p, 'consulta contexto')
    .subscribe(
      (data)=>{
        this.listaResultadoC= data['resultado'];
        this.estaCargando=false;
      },
    (error)=>{

        console.error(error);
        this.estaCargando=false;
      }
    )
  }

  public recortaNarrativa(texto: string, termino:string, tm:number):string {
    //texto.normalize('NFD')
    /*if(texto.indexOf(termino)>=0 && texto.indexOf(termino)>largo){
      let pt=texto.indexOf(termino)
      let inicio=pt-largo/2+(texto.indexOf(' ', pt-largo/2)-(pt-largo/2));
      let fin=texto.indexOf(' ',inicio+largo);
      if(fin==-1){
        return '...'+texto.substring(inicio)
      }
      return '...'+texto.substring(inicio, fin) + '...';
    }else{
      if (texto.length > largo) {
        return texto.substring(0, texto.indexOf(' ', largo)) + '...';
      }

    }
    return texto;*/
    let original=texto;
    texto=texto.toLowerCase();
    termino=termino.toLowerCase().replace(/["]+/g,'');

    if(texto.indexOf(termino)>=0 && texto.indexOf(termino)>tm){
      let pt=texto.indexOf(termino)
      let inicio=pt-tm/2+(texto.indexOf(' ', pt-tm/2)-(pt-tm/2));
      let fin=texto.indexOf(' ',inicio+tm);

      if(fin==-1){
        return '...'+original.substring(inicio)
      }
      return '...'+original.substring(inicio, fin) + '...';
    }else{
      if (texto.length > tm) {
        return texto.substring(0, texto.indexOf(' ', tm)) + '...';
      }

    }
    return texto;
  }
}

