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
  @Input() textoBuscado:string="";
  public sermon:any=null;
  public libro:any=null;
  public preliminares:any[]=null;
  public catalogos:any[]=null;
  public grabados:any[]=null;
  public repositorios:any[]=null;
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

      this.sermon=null;
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

        this.estaCargando=false;
        this.tabSeleccionado=0;
        if(this.sermon.protesta_fe!=null && this.sermon.protesta_fe.toLowerCase()=="nada") this.sermon.protesta_fe=null;
        
      },
    (error)=>{

        this.estaCargando=false;
      }
    )
    
  }
  
  public estaVacio(dato:string):boolean{
    if(dato==null) return true;
    if(dato=="") return true;
    let datomin=dato.toLowerCase();
    if(datomin.indexOf("[")==0 &&
        datomin.indexOf("]")>=0) return true;
    return false;
  }

  public estaEncomillado(texto:string):boolean{

    if(texto.substr(0,1)=='"' ){

      return true;
    } 
    return false;
  }

  public referencia(campo:string):string{
    let idx=campo.indexOf(' ');

    if(idx==-1){

      return campo;
    } 

    return campo.substr(0,idx);
  }
}

