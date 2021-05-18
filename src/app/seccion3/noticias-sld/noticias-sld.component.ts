import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { Globales } from '../../generales/globales';

@Component({
  selector: 'app-noticias-sld',
  templateUrl: './noticias-sld.component.html',
  styleUrls: ['./noticias-sld.component.css']
})
export class NoticiasSLDComponent implements OnInit, OnDestroy {

  public imgSel="";
  public listaNoticias:any[]=null;
  public estaCargando=false;
  public noticiaActiva=null;
  public elemento=null;
  public ruta:string=null;
  private intervalo;

  constructor(private cnx:ConexionService) { 
    this.ruta=Globales.rutaImgNoticias;
  }

  ngOnInit(): void {
    this.estaCargando=true;
    this.cnx.noticias(null, 'obtener todas las noticias activas').subscribe(
      (datos) => {
        this.listaNoticias = datos['resultado'];
        if(this.listaNoticias.length==0){
          this.listaNoticias=null;
          return;
        } 
        this.estaCargando=false;
        this.noticiaActiva=this.listaNoticias?this.listaNoticias[0]:null;      
        if(this.listaNoticias.length>0){
          this.intervalo=setInterval(()=>this.siguiente(),5000);
        }
    },
    (error) => {
        console.log('error al cargar a las noticias');
        console.log(error);
        this.estaCargando=false;
        this.listaNoticias=null;
    });

  }

  ngOnDestroy():void{
    clearInterval(this.intervalo);
  }

  public seleccionarImagen(img){
    this.imgSel=img;
  }

  public cerrarImagen(){
    this.imgSel="";
  }

  public seleccionarNoticia(ntca:any){
    this.noticiaActiva=ntca;
  }


  public siguiente(){
    let idx=this.listaNoticias.indexOf(this.noticiaActiva);
    if(idx==this.listaNoticias.length-1){
      this.noticiaActiva=this.listaNoticias[0];
    }else{
      idx++;
      this.noticiaActiva=this.listaNoticias[idx];
    }
  }

  public anterior(){
    let idx=this.listaNoticias.indexOf(this.noticiaActiva);
    if(idx==0){
      this.noticiaActiva=this.listaNoticias[this.listaNoticias.length-1];
    }else{
      idx--;
      this.noticiaActiva=this.listaNoticias[idx];
    }
  }

}
