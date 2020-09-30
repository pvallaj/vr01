import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/conexion.service';

@Component({
  selector: 'app-cons-sermones',
  templateUrl: './cons-sermones.component.html',
  styleUrls: ['./cons-sermones.component.css']
})
export class ConsSermonesComponent implements OnInit {
  public listaResultado:any[]=[];
  constructor(private cnx:ConexionService) { }
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

}
