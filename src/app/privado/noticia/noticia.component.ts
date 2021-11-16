import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Globales } from '../../generales/globales';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { UtilS } from '../../servicios/Util.service';

@Component({
  selector: 'app-noticia',
  styleUrls: ['./noticia.component.css'],
  templateUrl: './noticia.component.html',
})
export class NoticiaComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
    Muestra el detalle de una noticia. permite agregar o editar los datos de la misma.
  ******************************************************************************************/
  public frm: FormGroup;
  public urlIMG: any;
  public estaProcesando = false;
  private archivo: any;
  public fechaMin: Date;
  public fechaMax: Date;

  constructor(
    public cnl: CanalService,
    private cnx: ConexionService,
    private fb: FormBuilder,
    private su: SesionUsuario,
    private dlg: MatDialog,
    private ru: Router,
    private us: UtilS,
    ) {

      this.crearForma();
  }
  public crearForma() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Crea la forma que contiene los datos de la noticia.
    ******************************************************************************************/
    let vals = null;
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (this.cnl.elemento) {
      this.fechaMin = this.us.CadenaADate(this.cnl.elemento.inicio);
      this.fechaMax = new Date((new Date()).getTime() + 365 * (1000 * 60 * 60 * 24));
      vals = {
        // valor inicial, validaciones sincronas, validaciones asincronas
        imagen: ['',  [ Validators.minLength(1), Validators.maxLength(100)]],
        imagenFuente: [  ],
        inicio: [{value: this.us.CadenaADate(this.cnl.elemento.inicio), disabled: false},  [Validators.required]],
        ligaExterna:  [this.cnl.elemento.ligaExterna,  [ Validators.minLength(1), Validators.maxLength(300), Validators.pattern(reg)]],
        termino: [{value: this.us.CadenaADate(this.cnl.elemento.termino), disabled: false},  [Validators.required]],
        texto: [this.cnl.elemento.texto,  [Validators.required, Validators.minLength(20), Validators.maxLength(6500)]],
        titulo: [this.cnl.elemento.titulo,  [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      };
      if (this.cnl.elemento.imagen) {
        this.urlIMG = Globales.rutaImgNoticias + '/' + this.cnl.elemento.imagen;

      }
    } else {
      this.fechaMin = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24));
      this.fechaMax = new Date((new Date()).getTime() + 365 * (1000 * 60 * 60 * 24));
      vals = {
        // valor inicial, validaciones sincronas, validaciones asincronas
        imagen: [ ,  [ Validators.minLength(1), Validators.maxLength(100)]],
        imagenFuente: [  ],
        inicio: [{value: new Date(), disabled: false},  [Validators.required]],
        ligaExterna:  [,  [ Validators.minLength(1), Validators.maxLength(300), Validators.pattern(reg)]],
        termino: [{value: new Date(), disabled: false},  [Validators.required]],
        texto: [ ,  [Validators.required, Validators.minLength(20), Validators.maxLength(6500)]],
        titulo: [ ,  [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
      };
    }
    this.frm = this.fb.group(vals);

  }
  public ngOnInit(): void {
  }

  public archivoSeleccionado(fileInputEvent: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      obtiene el archivo seleccionado por el usuario, en su equipo.
    ******************************************************************************************/
    this.archivo = fileInputEvent.target.files[0];

    const files = fileInputEvent.target.files;
    if (files.length === 0) {
      return;
    }

    const mimeType = this.archivo.type;
    if (mimeType.match(/image\/*/) == null) {

      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.archivo);
    reader.onload = (event) => {
      this.urlIMG = reader.result;
    };

  }

  public guardar() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite guardar los datos de la noticia, ya sea para crear el registro o para editarlo.
    ******************************************************************************************/
    this.estaProcesando = true;
    const prms = {...this.frm.value};
    prms.inicio = this.us.DateACadenaSQL(prms.inicio);
    prms.termino = this.us.DateACadenaSQL(prms.termino);

    if (this.cnl.elemento != null) {
      // para actualización del registro
      prms.id = this.cnl.elemento.id;
      if (this.archivo) {
        prms.file = this.urlIMG;
        prms.nombre_archivo = this.archivo.name;
        this.cnx.noticias(prms, 'actualizar Noticia').subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
      } else {
        this.cnx.noticias(prms, 'actualizar Noticia').subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
      }
    } else {
      // para creación del registro
      if (this.archivo) {
        prms.file = this.urlIMG;
        prms.nombre_archivo = this.archivo.name;
        this.cnx.noticias(prms, 'crear Noticia').subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
      } else {
        this.cnx.noticias(prms, 'crear Noticia').subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
      }

    }
  }
  public registroExitoso(r) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Se ejecuta cuando el proceso de guardar la información ha sido exitosa.
    ******************************************************************************************/
    if (r.ok === true) {
      if (this.cnl.elemento != null) {
        this.dlg.open(MensajeComponent, {
          data: {
          mensaje: 'La noticia se actualizado exitosamente.',
          tipo: 1,
          titulo: 'Actualización de datos de noticia',
        }});
        this.cnl.elemento = null;
      } else {
        this.dlg.open(MensajeComponent, {
          data: {
            mensaje: 'La noticia se creo exitosamente.',
            tipo: 1,
            titulo: 'Registro de nueva noticia',
        }});
      }
      this.ru.navigate(['publicar']);
    } else {
        this.dlg.open(MensajeComponent, {data: {titulo: 'Registro de noticia', mensaje: 'Error: ' + r.message}});
    }
    this.estaProcesando = false;
  }
  public registroError(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Se ejecuta cuando el proceso de guardar la información ha fallado.
    ******************************************************************************************/
    this.dlg.open(MensajeComponent, {data: {titulo: 'Registro de noticia', mensaje: 'Error: ' + e.message}});
    this.estaProcesando = false;
  }
  public cambio() {

  }
}
