import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { UtilS } from '../../servicios/Util.service';
import { Globales } from '../../generales/globales';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  frm:FormGroup;
  public urlIMG:any;
  public estaProcesando=false;
  private archivo:any;
  fechaMin: Date;
  fechaMax: Date;

  constructor(
    public cnl:CanalService, 
    private cnx: ConexionService,
    private fb:FormBuilder,
    private su:SesionUsuario,
    private dlg: MatDialog,
    private ru:Router,
    private us:UtilS
    ) { 
 
      this.crearForma();
  }
  crearForma(){
    let vals=null;
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if(this.cnl.elemento){
      this.fechaMin=this.us.CadenaADate(this.cnl.elemento.inicio);
      this.fechaMax=new Date((new Date()).getTime()+365*(1000 * 60 * 60 * 24));
      vals={
        //valor inicial, validaciones sincronas, validaciones asincronas
        titulo:[this.cnl.elemento.titulo,  [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
        texto:[this.cnl.elemento.texto,  [Validators.required, Validators.minLength(20), Validators.maxLength(6500)]],
        ligaExterna:  [this.cnl.elemento.ligaExterna,  [ Validators.minLength(1), Validators.maxLength(300),Validators.pattern(reg)]],
        imagen: ['',  [ Validators.minLength(1), Validators.maxLength(100)]],
        inicio: [{value:this.us.CadenaADate(this.cnl.elemento.inicio), disabled:false},  [Validators.required]],
        termino: [{value:this.us.CadenaADate(this.cnl.elemento.termino), disabled:false},  [Validators.required]],
        imagenFuente: [  ]
      };
      if(this.cnl.elemento.imagen){
        this.urlIMG = Globales.rutaImgNoticias + '/' + this.cnl.elemento.imagen;

      }
    }else{
      this.fechaMin=new Date((new Date()).getTime()-(1000 * 60 * 60 * 24));
      this.fechaMax=new Date((new Date()).getTime()+365*(1000 * 60 * 60 * 24));
      vals={
        //valor inicial, validaciones sincronas, validaciones asincronas
        titulo:[ ,  [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
        texto:[ ,  [Validators.required, Validators.minLength(20), Validators.maxLength(6500)]],
        ligaExterna:  [,  [ Validators.minLength(1), Validators.maxLength(300),Validators.pattern(reg)]],
        imagen: [ ,  [ Validators.minLength(1), Validators.maxLength(100)]],
        inicio: [{value:new Date(), disabled:false},  [Validators.required]],
        termino: [{value:new Date(), disabled:false},  [Validators.required]],
        imagenFuente: [  ]
      };
    }
    this.frm=this.fb.group(vals);

  }
  ngOnInit(): void {
  }
  archivoSeleccionado(fileInputEvent: any) {
    this.archivo=fileInputEvent.target.files[0];
    
    let files=fileInputEvent.target.files;
    if (files.length === 0)
      return;
 
    var mimeType = this.archivo.type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }
 
    var reader = new FileReader();
    reader.readAsDataURL(this.archivo); 
    reader.onload = (_event) => { 
      this.urlIMG = reader.result; 
    }

  }
  guardar() { 
    this.estaProcesando=true;
    let prms={...this.frm.value};
    prms.inicio=this.us.DateACadenaSQL(prms.inicio);
    prms.termino=this.us.DateACadenaSQL(prms.termino);

    if(this.cnl.elemento!=null){
      //para actualización del usuario
      prms.id=this.cnl.elemento.id; 
      if(this.archivo){
        prms.file=this.urlIMG;
        prms.nombre_archivo=this.archivo.name;
        this.cnx.noticias(prms,'actualizar Noticia').subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
      }else{
        this.cnx.noticias(prms,'actualizar Noticia').subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
      }
    }else{
      //para creación del registro
      if(this.archivo){
        prms.file=this.urlIMG;
        prms.nombre_archivo=this.archivo.name;
        this.cnx.noticias(prms,'crear Noticia').subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
      }else{
        this.cnx.noticias(prms,'crear Noticia').subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
      }
      
    }
  }
  registroExitoso(r){ 
    if(r.ok==true){
      if(this.cnl.elemento!=null){
        this.dlg.open(MensajeComponent, {data:{titulo: 'Actualización de datos de noticia', mensaje: 'La noticia se actualizado exitosamente.', tipo:1}});
        this.cnl.elemento=null;
      }else{
        this.dlg.open(MensajeComponent, {data:{titulo: 'Registro de nueva noticia', mensaje: 'La noticia se creo exitosamente.', tipo:1}});
      }
      this.ru.navigate(['publicar']);
    } else{
        this.dlg.open(MensajeComponent, {data:{titulo: 'Registro de noticia', mensaje: 'Error: '+r.message}});
    }
    this.estaProcesando=false;
  }
  registroError(e){

    this.dlg.open(MensajeComponent, {data:{titulo: 'Registro de noticia', mensaje: 'Error: '+e.message}});
    this.estaProcesando=false;
  }
  cambio(){
   
  }
}
