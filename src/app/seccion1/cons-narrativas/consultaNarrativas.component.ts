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
  public listaAutores:string[]=[];
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

  //----------------------------
  public filtrosActivos = new FormControl();
  public listaFiltros: string[] = ['Autor y Obra', 'Clasificación', 'Tema', 'Motivo', 'Tipo de Verso', 'Tipo de Accion', 'Soporte', 'Vínculo Visual', 'Vínculo Auditivos','Vínculo Acción Dramatica'];

  constructor(
     private cnx: ConexionService,
     public dialog: MatDialog,
     private fb: FormBuilder) {
      this.filtrosActivos.setValue(['Autor y Obra', 'Obra']);
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
        console.log(datos);
    },
    (error)=>{
      console.log("error al cargar a los autores");
      console.log(error);
    })
  }
  
  autorSeleccionado(sel){
    console.log("seleccionado: ");
    console.log(sel);
    this.listaObras = this.listaAutoresObras.filter(elm => elm.autor === sel.value);
    console.log(this.listaObras);
  }

  public consulta(){
    this.estaCargando=true;

    console.log(this.frm.value);

    let p = {
      autor: this.frm.value.autor,
      obra: this.frm.value.obra,
      clasificacion: this.frm.value.clasificacion,
      tema: this.frm.value.tema,
      desde:  this.pidx*this.ptam,
      pagtam: this.ptam
    };

    let temp:any[]=[];
    this.idxSeleccionado=0;

    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        this.listaResultado=data['resultado'];
        console.log(this.listaResultado);
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
    if (this.despResultado === 'block') {
      this.idNarrativaSel = seleccionado.id_texto;
      this.narrativaSeleccionada = seleccionado;
      this.despResultado = 'none';
      this.despDetalle = 'block';
    } else {
      this.idNarrativaSel = 0;
      this.narrativaSeleccionada = null;
      this.despResultado = 'block';
      this.despDetalle = 'none';
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
      versificacion: ['' ],
      tipoAccion: ['' ],
      soporte: ['' ],
      vinculoVisual: ['' ],
      vinculoAuditivo: ['' ],
      vinculoAccionDramatica: ['' ],
     
    });
  }
  cambioAutor(){
    this.listaResultado=[];
  }

  cambioFiltros(e){
    console.log(e);
    console.log(this.filtrosActivos.value);
  }

}

