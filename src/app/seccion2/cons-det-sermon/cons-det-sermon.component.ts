import {Component, Inject, OnInit,Input, OnChanges} from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';
import { CanalService } from '../../servicios/canal.service';

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
  @Input() tipo:number=0;
  public sermon:any=[];
  public libro:any=[];
  public preliminares:any=[];
  public catalogos:any=[];
  public grabados:any=[];
  public repositorios:any=[];
  public estaCargando:boolean=false;
  public tabSeleccionado=0;
  public terminoConsulta:string='';

  constructor(
    private cnx:ConexionService,
    public dialog: MatDialog,
    public cs:CanalService) {}

  ngOnInit(): void {
    this.tabSeleccionado=0;
    this.terminoConsulta=this.cs.terminoConsulta;
  }

  ngOnChanges(changes) {
    
    if (this.id_sermon <= 0) {
      console.log("Regresando a valores iniciales");
      this.sermon=[];
      this.libro=[];
      this.preliminares=[];
      this.catalogos=[];
      this.grabados=[];
      this.repositorios=[];
      return;
    }
    //consultando detalle del sermon
    this.estaCargando = true;

    this.cnx.sermones({id_sermon:this.id_sermon}, 'consulta detalle sermon')
    .subscribe(
      (data)=>{
        let idx=1;
        let temp=data['resultado'];
        this.sermon=temp.sermon[0];
        this.libro=temp.libro[0];
        this.preliminares=temp.preliminares;
        this.catalogos=temp.catalogos;
        this.grabados=temp.grabados;
        this.repositorios=temp.repositorios;
        //console.log(temp);
        this.estaCargando=false;
        this.tabSeleccionado=0;
      },
    (error)=>{
        //console.log('No se logro la conexión');
        //console.error(error);
        this.estaCargando=false;
      }
    )


  }
}
