import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../../servicios/Conexion.service';

import {MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';

@Component({
  selector: 'app-lista-usuarios',
  styleUrls: ['./lista-usuarios.component.css'],
  templateUrl: './lista-usuarios.component.html',
})
export class ListaUsuariosComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestras la lista de usuarios dispibles, asi como las acciones sobre los mismos: crear, editar, eliminar y cambiar rol.
  ******************************************************************************************/
  public estaCargando = false;
  public estaProcesando = false;
  public columnasVisibles: string[] = ['id', 'nombre', 'paterno', 'materno', 'correo', 'telefono', 'role'];
  public usuarios: any[] = [];

  public seleccionado: any;

  public selection = new SelectionModel<any>(true, []);

  constructor(private cnx: ConexionService, private r: Router, public dialog: MatDialog, private canal: CanalService) { }

  public ngOnInit(): void {
    this.estaCargando = true;
    this.cnx.usuarios(null, 'obtener usuarios')
    .subscribe(
      (datos) => {
        this.usuarios = datos['resultado'];
      },
    (error) => {

        this.estaCargando = false;
      },
    );
  }

  public seleccionar(e: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite seleccionar un elemento, es decir, un usuario.
    PARAMETROS:
      e. Es el elemento seleccionado.
    ******************************************************************************************/
    this.seleccionado = e;
  }

  public agregarUsuario() {
    /******************************************************************************************
    DESCRIPCIÓN:
      muestra la opción de registro de usuario.
    ******************************************************************************************/
    this.r.navigate(['registro']);
  }

  public eliminarUsuario() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Elimina el usuario seleccionado.
    ******************************************************************************************/
    if (this.seleccionado === undefined) {
      const dRef = this.dialog.open(MensajeComponent, {
        data: {
          mensaje: 'Debe seleccionar al usuarios que desea eliminar dando un CLICK sobre el registro',
          tipo: 1,
          titulo: 'Eliminar Usuario',
        },
      });
      return;
    }

    const dialogRef = this.dialog.open(MensajeComponent, {
      data: {
        mensaje: 'El usuario:\n '
        + this.seleccionado.nombre.toUpperCase() + '  '
        + this.seleccionado.paterno.toUpperCase() + '  '
        + this.seleccionado.materno.toUpperCase() + '  ('
        + this.seleccionado.correo.toUpperCase() + ') \n Será eliminado de forma definitiva. ¿Desea continuar?',
        tipo: 2,
        titulo: 'Eliminar Usuario',
    },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'no') { return; }
      this.estaProcesando = true;
      this.cnx.usuarios({id: this.seleccionado.id}, 'eliminar')
      .subscribe(
        (datos) => {
          let dRef = this.dialog.open(MensajeComponent, {
            data: {titulo: 'Eliminar Usuario', mensaje: 'El resgistro fue eliminado EXITOSAMENTE', tipo: 1},
          });
          dRef = null;
          this.usuarios = this.usuarios.filter((reg) => reg.id !== this.seleccionado.id);
          this.seleccionado = null;
          this.estaProcesando = false;
        },
      (error) => {
          console.error(error);
          this.estaProcesando = false;
        },
      );
    });
  }

  public cambiarRoleUsuario() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite cambiar el rol de usuario a publicador y viceversa.

    ******************************************************************************************/
    if (this.seleccionado === undefined) {
      const dRef = this.dialog.open(MensajeComponent, {
        data: {
          mensaje: 'Debe seleccionar al usuarios que desea modificar dando un CLICK sobre el registro',
          tipo: 1,
          titulo: 'Cambiar Perfil',
        },
      });
      return;
    }

    const dialogRef = this.dialog.open(MensajeComponent, {
      data: {
        mensaje: 'El usuario:\n'
        + this.seleccionado.nombre.toUpperCase() + '  '
        + this.seleccionado.paterno.toUpperCase() + '  '
        + this.seleccionado.materno.toUpperCase() + '  ('
        + this.seleccionado.correo.toUpperCase() + ') \nTiene el perfil: "'
        + this.seleccionado.role.toUpperCase() + '" y cambiará a: "'
        + (this.seleccionado.role.toUpperCase() === 'USUARIO' ? 'PUBLICAR' : 'USUARIO')
        + '". ¿Desea continuar?',
        tipo: 2,
        titulo: 'Cambiar perfil',
    },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'no') { return; }
      this.estaProcesando = true;
      this.cnx.usuarios({
        id: this.seleccionado.id,
        role: this.seleccionado.role.toUpperCase() === 'USUARIO' ? 'PUBLICAR' : 'USUARIO',
      }, 'cambiar perfil')
      .subscribe(
        (datos) => {
          const dRef = this.dialog.open(MensajeComponent, {
            data: {titulo: 'Cambiar perfil', mensaje: 'El resgistro fue actualizado EXITOSAMENTE', tipo: 1},
          });

          this.seleccionado.role = this.seleccionado.role.toUpperCase() === 'USUARIO' ? 'PUBLICAR' : 'USUARIO';

          this.estaProcesando = false;
        },
      (error) => {
          console.error(error);
          this.estaProcesando = false;
        },
      );
    });
  }

  public actualizarUsuario() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite realizar cambios a los datos del usuario.
    ******************************************************************************************/
    if (this.seleccionado === undefined) {
      const dialogRef = this.dialog.open(MensajeComponent, {
        data: {
          mensaje: 'Debe seleccionar al usuarios que desea modificar dando un CLICK sobre el registro',
          tipo: 1,
          titulo: 'Actualizar Usuario',
        },
      });
      return;
    }
    this.canal.elemento = {... this.seleccionado};
    this.r.navigate(['registro']);
  }

}
