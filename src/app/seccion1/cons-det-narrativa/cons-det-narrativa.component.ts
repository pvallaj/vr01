import {Component, Inject, OnInit,Input, OnChanges} from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';

export interface Parametros {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-cons-det-narrativa',
  templateUrl: './cons-det-narrativa.component.html',
  styleUrls: ['./cons-det-narrativa.component.css']
})
export class ConsDetNarrativaComponent implements OnInit, OnChanges {

  @Input() id_texto:number=0;
  bibliografia:any=[];
  
  estaCargando:boolean=false;
  tabSeleccionado:number=0;

  constructor(private cnx:ConexionService,
    public dialog: MatDialog,) {}

  ngOnInit(): void {
  }
  
  ngOnChanges(changes) {
    console.log("Cambio de narrativa");
    console.log(changes);
    if(this.id_texto==0){
      console.log("Regresando a valores iniciales");
      this.bibliografia=[];
      
      return;
    } 
    //consultando detalle del sermon
    this.cnx.narrativas({id_texto:this.id_texto}, 'consulta detalle narrativa')
    .subscribe(
      (data)=>{
        let idx=1;
        let temp=data['resultado'];
        console.log(temp);
        this.bibliografia=temp.bibliograficos[0];
        
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )


  }
}
