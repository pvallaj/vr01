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
  public resultadoNarrativas:string[]=[];
  public resultadoSermones:string[]=[];
  public referencia:string=null;
  public tipoReferencia:string=null;
  public elementoSeleccionado:any;

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
    this.buscarTermino({text:this.cs.terminoConsulta});
  }

  private buscarTermino(terminos:any){
    if(!terminos || !terminos?.text) return;
    this.estaCargando=true;
    this.cnx.novohisp({terminos:terminos.text}, 'buscar terminos')
    .subscribe(
      (data) => {
        this.resultadoOE=data['resultado'].obraescrita;
        this.resultadoNarrativas=data['resultado'].narrativas;
        this.resultadoSermones=data['resultado'].sermones;

        this.resultadoNarrativas.forEach((lmnt:any) => {
          lmnt.narratioRecortado=this.recorta(lmnt.narratio,200);
        });

        this.resultadoSermones.forEach((lmnt:any) => {
          lmnt.sermonRecortado=this.recorta(lmnt.titulo,200);
        });

        this.estaCargando=false;
      },
    (error) => {
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public recorta(texto: string, tm:number):string {
    if (texto.length > tm) {
      return texto.substring(0, texto.indexOf(' ', tm)) + '...';
    }
    return texto;
  }

  public verDetalle(e:any){
    console.log(e);
    if(e.id_sermon){
      console.log('-->Sermon');
      this.tipoReferencia='sermon';
      this.referencia=e.id_sermon;
      return;
    }
    if(e.id_texto){
      console.log('-->Relación');
      this.tipoReferencia='relacion';
      this.referencia=e.id_texto;
      return;
    }

    if(e.tipo){
      this.tipoReferencia='buscar';
      this.referencia="varios";
      this.elementoSeleccionado=e;
      return;
    }
  }

  public cerrarDetalle(){
    this.tipoReferencia=null;
    this.referencia=null;
  }
  ngOnDestroy(): void {
    this.escucha.unsubscribe();
  }

}