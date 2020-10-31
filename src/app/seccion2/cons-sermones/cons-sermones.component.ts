import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { ConexionService } from '../../servicios/Conexion.service';
import { MnsjDetalleComponent } from '../../seccion1/mnsj-detalle/mnsj-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { ConsDetSermonComponent } from '../cons-det-sermon/cons-det-sermon.component';


@Component({
  selector: 'app-cons-sermones',
  templateUrl: './cons-sermones.component.html',
  styleUrls: ['./cons-sermones.component.css']
})
export class ConsSermonesComponent implements OnInit {
  public listaResultado:any[]=[];
  //autocomplete
  acAutores = new FormControl();
  listaAutores:string[]=[];
  listaAutoresOriginal:any[]=[];
  listaFiltrada: Observable<string[]>;

  despResultado:string='block';
  despDetalle:string='none';

  frm:FormGroup;

  //paginación
  pidx:number=0; //Número de página.
  ptam:number=10; //tamaño de la pagina

  //seleccionar elemento
  idxSeleccionado:number=0;
  id_sermon_sel:number=0;
  //Cargando datos.
  estaCargando:boolean= false;

  //@ViewChild("detsermon") detSermon: ConsDetSermonComponent;

  constructor(private cnx:ConexionService,
     public dialog: MatDialog,
     private fb:FormBuilder) { }
  public textConsulta:string;
  ngOnInit(): void {
    this.crearForma();
    this.listaFiltrada = this.acAutores.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );


    this.cnx.sermones(null, 'consulta autores').subscribe(
      (datos)=>{
        this.listaAutoresOriginal=datos["resultado"];
        datos["resultado"].forEach(autor => {
          this.listaAutores.push(autor.autor);        
        });
      console.log(this.listaAutores);
    },
    (error)=>{
      console.log("error al cargar a los autores");
      console.log(error);
    })
  }
  
  consulta(){
    this.estaCargando=true;
    let p={
      autor: this.acAutores.value,
      id_autor:-1,
      desde:  this.pidx*this.ptam,
      pagtam: this.ptam
    };

    let temp:any[]=[];
    
    let encontrado=this.listaAutoresOriginal.find(el=>el.autor==this.acAutores.value);
    if(encontrado){
      p.id_autor=encontrado.id_autor;
    }

    console.log(p);
    this.cnx.sermones(p, 'consulta sermones')
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        temp.forEach(el => {
          el.muestra=el.autor_apellido+', '+el.autor_nombre+' y '+(el.autor_particula?'':el.autor_particula)+' '+el.titulo+', '+el.ciudad+', '+el.anio+'.';
          idx++;
        });
        this.listaResultado=temp;
        //console.log(this.listaResultado);
        this.estaCargando=false;
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )
  }
  
  detalle(){
    const dialogRef = this.dialog.open(ConsDetSermonComponent, {
      width: '95%',
      data: {nombre:"Hola", descripcion:"Amigo"}
    });
  }

  cambiar(ids){
    console.log(ids);
    if(this.despResultado=='block'){
      this.despResultado='none';
      this.despDetalle='block';
      this.id_sermon_sel=ids;

    }else{
      this.despResultado='block';
      this.despDetalle='none';
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listaAutores.filter((option) => option.toLowerCase().includes(filterValue));
  }

  crearForma(){
    this.frm=this.fb.group({
      //valor inicial, validaciones sincronas, validaciones asincronas
      autor:['', [ Validators.maxLength(300)]]
    });
  }
  cambioAutor(){
    this.listaResultado=[];
  }
}
