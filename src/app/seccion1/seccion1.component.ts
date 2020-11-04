import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { ConexionService } from '../servicios/Conexion.service';
import { MnsjDetalleComponent } from '../seccion1/mnsj-detalle/mnsj-detalle.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-seccion1',
  templateUrl: './seccion1.component.html',
  styleUrls: ['./seccion1.component.css']
})
export class Seccion1Component implements OnInit {
  public listaResultado:any[]=[];
  //autocomplete
  acAutores = new FormControl();
  listaAutores:string[]=[];
  listaAutoresObras:any[]=[];
  listaObras: any[]=[];
  listaCategorias: any[]=[];


  despResultado:string='block';
  despDetalle:string='none';

  frm:FormGroup;

  //paginación
  pidx:number=0; //Número de página.
  ptam:number=10; //tamaño de la pagina

  //seleccionar elemento
  idxSeleccionado:number=0;

  //Cargando datos.
  estaCargando:boolean= false;

  constructor(private cnx:ConexionService,
     public dialog: MatDialog,
     private fb:FormBuilder) { }
  public textConsulta:string;
  ngOnInit(): void {
    this.crearForma();
    


    this.cnx.narrativas(null, 'consulta catalogo base').subscribe(
      (datos)=>{
        this.listaAutores=datos['resultado'].autores;
        this.listaAutoresObras=datos['resultado'].obras;
        this.listaCategorias=datos['resultado'].clasificacion;
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
    this.listaObras=this.listaAutoresObras.filter(elm=>elm.autor==sel.value);
    console.log(this.listaObras);
  }

  consulta(){
    this.estaCargando=true;
    let p={
      autor: this.frm.value.autor,
      obra: this.frm.value.obra,
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
  
  
  cambiar(){
    if(this.despResultado=='block'){
      this.despResultado='none';
      this.despDetalle='block';
    }else{
      this.despResultado='block';
      this.despDetalle='none';
    }
  }


  crearForma(){
    this.frm=this.fb.group({
      //valor inicial, validaciones sincronas, validaciones asincronas
      autor:['' ],
      obra:['' ],
      categoria:['']
    });
  }
  cambioAutor(){
    this.listaResultado=[];
  }

}

