import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { ConexionService } from '../../servicios/Conexion.service';
import { MnsjDetalleComponent } from '../mnsj-detalle/mnsj-detalle.component';
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
    { filtro : 'Textos o Palabras', descripcion: 'Busqueda de palabras o textos en un espacio de 100 palabras'}];

  constructor(
     private cnx: ConexionService,
     public dialog: MatDialog,
     private fb: FormBuilder) {
      this.filtrosActivos.setValue(['Autor', 'Obra', 'Textos o Palabras']);
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

    let temp:any[]=[];
    this.idxSeleccionado=0;

    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        this.listaResultado=data['resultado'];
        this.listaResultado.forEach(lmnt => {
          lmnt.narratioRecortado=this.recortaNarrativa(lmnt.narratio);
        });
        if(this.frm.value.textos){
          console.log("busqueda por textos!!!!!");
          let palabras=this.frm.value.textos.split('+',3);
          let re= new RegExp(palabras[0],'gi');
          this.listaResultado.forEach(lmnt => {
            console.log(lmnt.narratio);
            console.log(re);
            console.log(palabras[0]);

            /*lmnt.narratio=lmnt.narratio.replace(re,'<span class="xxxx">'+palabras[0]+'</span>');
            lmnt.narratioRecortado=lmnt.narratioRecortado.replace(re,'<span>'+palabras[0]+'</span>');*/
            
            console.log(lmnt.narratio);
            console.log(lmnt.narratioRecortado);
          });
        }
        this.estaCargando=false;
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )
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

    });
  }
  cambioAutor(){
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

