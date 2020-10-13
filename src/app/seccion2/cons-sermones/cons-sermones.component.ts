import { Component, OnInit } from '@angular/core';
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

  despResultado:string='block';
  despDetalle:string='none';

  constructor(private cnx:ConexionService, public dialog: MatDialog) { }
  public textConsulta:string;
  ngOnInit(): void {
  }
  
  consulta(){
    let p={
      autor: this.textConsulta
    };
    let temp:any[]=[];
    
    this.cnx.obtenerSermones(p)
    .subscribe(
      (data)=>{
        let idx=1;
        temp=data['resultado'];
        temp.forEach(el => {
          el.muestra=el.autor_apellido+', '+el.autor_nombre+' y '+(el.autor_particula?'':el.autor_particula)+' '+el.titulo+', '+el.ciudad+', '+el.anio+'.';
          idx++;
        });
        this.listaResultado=temp;
        console.log(this.listaResultado);
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
      }
    )
  }
  detalle(){
    const dialogRef = this.dialog.open(ConsDetSermonComponent, {
      width: '95%',
      data: {nombre:"Hola", descripcion:"Amigo"}
    });
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
}
