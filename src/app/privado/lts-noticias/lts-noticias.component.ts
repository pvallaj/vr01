import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';

@Component({
  selector: 'app-lts-noticias',
  styleUrls: ['./lts-noticias.component.css'],
  templateUrl: './lts-noticias.component.html',
})
export class LtsNoticiasComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra una noticia y las acciones que se puede hacer con ellas: agregar, editar y eliminar.
  ******************************************************************************************/
  public listaNoticias: any = [];
  public estaProcesando = false;
  public columnasVisibles = ['id', 'titulo', 'inicio', 'termino', 'acciones'];
  public seleccionado: any = null;

  constructor(private sus: SesionUsuario,
              private ru: Router,
              private cnx: ConexionService,
              public  dialog: MatDialog,
              public  cnl: CanalService) { }

  public ngOnInit(): void {
    if (this.sus.estadoSesion === 'desconectado') {
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

  public agregar() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Cambia a la opciòn de AGREGAR una noticia.
    ******************************************************************************************/
    this.cnl.elemento = null;
    this.ru.navigate(['crearNoticia']);
  }

  public actualizar(e: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Cambia a la opciòn de MODIFICAR una noticia.
    ******************************************************************************************/
    this.cnl.elemento = e;
    this.ru.navigate(['modifNoticia']);
  }
  public eliminar(e: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite eliminar una noticia.
    ******************************************************************************************/
    this.seleccionado = e;

    if (this.seleccionado === undefined) {
      const dRef = this.dialog.open(MensajeComponent, {
        data: {
          mensaje: 'Debe seleccionar la Noticia que desea eliminar dando un CLICK sobre el registro',
          tipo: 1,
          titulo: 'Eliminar Noticia',
        },
      });
      return;
    }

    const dialogRef = this.dialog.open(MensajeComponent, {
      data: {
        mensaje: 'La Noticia:\n\n  '
        + this.seleccionado.id + ' -  '
        + this.seleccionado.titulo?.toUpperCase() +
        '\n\n  Será eliminada de forma definitiva. ¿Desea continuar?',
        tipo: 2,
        titulo: 'Eliminar Noticia',
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'no') { return; }
      this.estaProcesando = true;
      this.cnx.noticias({id: this.seleccionado.id}, 'eliminar Noticia')
      .subscribe(
        (datos) => {
          const dRef = this.dialog.open(MensajeComponent, {
            data: {
              mensaje: datos['message'],
              tipo: 1,
              titulo: datos['ok'] ? 'Eliminar Noticia' : '¡ ERROR !',
            },
          });
          if (datos['ok']) {
            this.listaNoticias = this.listaNoticias.filter((reg) => reg.id !== this.seleccionado.id);
            this.seleccionado = null;
          }
          this.estaProcesando = false;
        },
      (error) => {
          console.error(error);
          this.estaProcesando = false;
        },
      );
    });
  }
  public seleccionar(e: any) {
    this.seleccionado = e;
  }

}
