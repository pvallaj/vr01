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
      console.log("Regresando a valores iniciales");
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
        //console.log(temp);
        this.estaCargando=false;
        this.tabSeleccionado=0;
        if(this.sermon.protesta_fe!=null && this.sermon.protesta_fe.toLowerCase()=="nada") this.sermon.protesta_fe=null;
        
      },
    (error)=>{
        //console.log('No se logro la conexión');
        //console.error(error);
        this.estaCargando=false;
      }
    )
    
  }
  
  public estaVacio(dato):boolean{
    if(dato==null) return true;
    if(dato=="") return true;
    if(dato.indexOf("[")>=0) return true;
    return false;
  }

  public referencia(campo:string):string{
    let idx=campo.indexOf(' ');
    console.log(idx); 
    if(idx==-1){
      console.log(campo);
      return campo;
    } 
    console.log(campo.substr(0,idx));
    return campo.substr(0,idx);
  }
}

