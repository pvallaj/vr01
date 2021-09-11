import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';

@Component({
  selector: 'app-lts-noticias',
  templateUrl: './lts-noticias.component.html',
  styleUrls: ['./lts-noticias.component.css']
})
export class LtsNoticiasComponent implements OnInit {
  public listaNoticias:any=[];
  public estaProcesando=false;
  public columnasVisibles=['id', 'titulo', 'inicio', 'termino','acciones'];
  public seleccionado:any=null;

  constructor(private sus:SesionUsuario, 
    private ru:Router,
    private cnx:ConexionService,
    public  dialog: MatDialog,
    public  cnl:CanalService) { }

  ngOnInit(): void {
    if(this.sus.estadoSesion=='desconectado'){
      this.ru.navigate(['sesion']);
    }

    this.cnx.noticias(null, 'obtener todas las noticias').subscribe(
      (datos) => {
        this.listaNoticias = datos['resultado'];

    },
    (error) => {
      console.log(error);
    });
  }

  public agregar(){
    this.cnl.elemento=null;
    this.ru.navigate(['crearNoticia']);
  }

  public actualizar(e:any){
    this.cnl.elemento=e;
    this.ru.navigate(['modifNoticia']);
  }
  public eliminar(e:any){
    this.seleccionado=e;

    if(this.seleccionado===undefined){
      const dialogRef = this.dialog.open(MensajeComponent, {
        data: {
          titulo:'Eliminar Noticia', 
          mensaje:'Debe seleccionar la Noticia que desea eliminar dando un CLICK sobre el registro',
          tipo:1}
      });
      return;  
    }

    const dialogRef = this.dialog.open(MensajeComponent, {
      data: {titulo:'Eliminar Noticia',
        mensaje:'La Noticia:\n\n  '
      +this.seleccionado.id+' -  '
      +this.seleccionado.titulo?.toUpperCase()+
      '\n\n  Será eliminada de forma definitiva. ¿Desea continuar?', tipo:2}
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado==='no') return;
      this.estaProcesando = true;
      this.cnx.noticias({id:this.seleccionado.id},'eliminar Noticia')
      .subscribe(
        (datos)=>{
          const dialogRef = this.dialog.open(MensajeComponent, {
            data: {
              titulo:datos['ok']?'Eliminar Noticia':'¡ ERROR !', 
              mensaje:datos['message'], 
              tipo:1
            }
          });
          if(datos['ok']){
            this.listaNoticias=this.listaNoticias.filter(reg=>reg.id!=this.seleccionado.id);
            this.seleccionado==null;
          }
          this.estaProcesando=false;
        },
      (error)=>{

          console.error(error);
          this.estaProcesando=false;
        }
      )
    });
  }
  public seleccionar(e:any){
    this.seleccionado=e;
  }

}
