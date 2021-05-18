import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-imagenes-sld',
  templateUrl: './imagenes-sld.component.html',
  styleUrls: ['./imagenes-sld.component.css']
})
export class ImagenesSLDComponent implements OnInit, OnDestroy {

  public imgSel="";
  public lista:any[]=null;
  public estaCargando=false;
  public elemento=null;
  private intervalo;

  public elementoSel:any=null;

  constructor(private cnx:ConexionService) { }

  ngOnInit(): void {
    this.estaCargando=true;
    this.cnx.novohisp({cantidad:5}, 'imagenes aleatorias').subscribe(
      (datos) => {
        this.lista = datos['resultado'];
        this.estaCargando=false;
   
    },
    (error) => {
        console.log('error al cargar a las noticias');
        console.log(error);
        this.estaCargando=false;
        this.lista=null;
    });

    this.intervalo=setInterval(()=>{
      this.estaCargando=true;
      this.cnx.novohisp({cantidad:5}, 'imagenes aleatorias').subscribe(
        (datos) => {
          this.lista = datos['resultado'];
          this.estaCargando=false;
     
      },
      (error) => {
          console.log('error al cargar a las noticias');
          console.log(error);
          this.estaCargando=false;
          this.lista=null;
      });
    },15000);
  }

  ngOnDestroy():void{
    clearInterval(this.intervalo);
  }

  public seleccionar(e:any){
    this.elementoSel=e;
    clearInterval(this.intervalo);
  }

  public quitarSeleccion(){
    this.elementoSel=null;
    this.intervalo=setInterval(()=>{
      this.estaCargando=true;
      this.cnx.novohisp({cantidad:5}, 'imagenes aleatorias').subscribe(
        (datos) => {
          this.lista = datos['resultado'];
          this.estaCargando=false;
     
      },
      (error) => {
          console.log('error al cargar a las noticias');
          console.log(error);
          this.estaCargando=false;
          this.lista=null;
      });
    },15000);
  }

}
