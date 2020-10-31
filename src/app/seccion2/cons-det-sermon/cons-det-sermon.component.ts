import {Component, Inject, OnInit,Input, OnChanges} from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';

export interface Parametros {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-cons-det-sermon',
  templateUrl: './cons-det-sermon.component.html',
  styleUrls: ['./cons-det-sermon.component.css']
})
export class ConsDetSermonComponent implements OnInit, OnChanges {

  @Input() id_sermon:number=0;
  sermon:any=[];
  libro:any=[];
  preliminares:any=[];
  estaCargando:boolean=false;

  constructor(private cnx:ConexionService,
    public dialog: MatDialog,) {}

  ngOnInit(): void {
  }
  
  ngOnChanges(changes) {
    console.log("cambio el parametro.....");
    console.log(changes);
    if(this.id_sermon==0) return;
    //consultando detalle del sermon
    this.cnx.sermones({id_sermon:this.id_sermon}, 'consulta detalle sermon')
    .subscribe(
      (data)=>{
        let idx=1;
        let temp=data['resultado'];
        this.sermon=temp.sermon[0];
        this.libro=temp.libro[0];
        this.preliminares=temp.preliminares;
        console.log(temp);
        this.estaCargando=false;
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )


  }
}
