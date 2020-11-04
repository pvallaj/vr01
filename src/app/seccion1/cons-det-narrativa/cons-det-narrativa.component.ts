import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';

export interface Parametros {
  nombre: string;
  descripcion: string;
}

export interface Narrativa {
  autor: string;
  narratio: string;
  id_texto: number;
  obra: string;
  nombre: string;
  ubicacion: string;
}
@Component({
  selector: 'app-cons-det-narrativa',
  templateUrl: './cons-det-narrativa.component.html',
  styleUrls: ['./cons-det-narrativa.component.css']
})
export class ConsDetNarrativaComponent implements OnInit, OnChanges {

  @Input() public idTexto = 0;
  @Input() public narrativa: Narrativa = null;

  public bibliografia: any = [];
  public princeps: any = [];

  public estaCargando = false;
  public tabSeleccionado = 0;

  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog ) {}

  ngOnInit(): void {
  }
  
  ngOnChanges(changes) {
    console.log('Cambio de narrativa');
    console.log(changes);
    if(this.idTexto === 0 ) {
      console.log("Regresando a valores iniciales");
      this.bibliografia=[];
      return;
    }

    //consultando detalle del sermon
    this.cnx.narrativas({id_texto: this.idTexto}, 'consulta detalle narrativa')
    .subscribe(
      (data)=>{
        let idx=1;
        let temp=data['resultado'];
        console.log(temp);
        this.bibliografia = temp.bibliograficos[0];
        this.princeps = temp.princeps[0];
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )


  }
}
