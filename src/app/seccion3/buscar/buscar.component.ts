import { Component, OnInit,OnDestroy } from '@angular/core';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy {
  private escucha: Subscription;

  public estaCargando=false;
  public idxSeleccionado:-1;
  public resultadoOE:string[]=[];


  constructor(private cs:CanalService, private cnx:ConexionService) {
    this.escucha = this.cs.getMessage().subscribe(m => {
      if (m) {
        console.log(m);
        this.buscarTermino(m);
      }
    });
   }

  ngOnInit(): void {
    console.log(this.cs.terminoConsulta);
    this.buscarTermino(this.cs.terminoConsulta);
  }

  private buscarTermino(terminos:any){
    this.cnx.novohisp({terminos:terminos.text}, 'buscar terminos')
    .subscribe(
      (data) => {
        this.resultadoOE=data['resultado'];
      },
    (error) => {
        console.log('No se logro la conexión');
        console.error(error);
        //this.estaCargando = false;
      },
    );
  }

  ngOnDestroy(): void {
    this.escucha.unsubscribe();
  }

}
