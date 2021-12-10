import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';

@Component({
  selector: 'app-iniciar-sesion',
  styleUrls: ['./iniciar-sesion.component.css'],
  templateUrl: './iniciar-sesion.component.html',
})
export class IniciarSesionComponent  {
  /******************************************************************************************
  DESCRIPCIÓN:
   Permite que un usuario se registre mediante las credenciales de correo y contraseña.
  ******************************************************************************************/
  @Input() public tipo: string;

  public submitted =    false;
  public ruteador: Router;
  public closeResult: string;
  public usuario = '';
  public password = '';

  constructor( private ru: Router,
               private su: SesionUsuario,
               private dlg: MatDialog,
    ) {
  }

  public registrarUsuario(dts) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace la solicitud de inicio de sesión.
    PARAMETROS:
      dts. Contiene las credenciales del usuario: el correo y su contraseña
    ******************************************************************************************/
    this.su.accesoUsuario({
      contrasena: dts.password,
      usuario: dts.usuario,
    })
      .subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
  }

  public registroExitoso(r) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Es procedimiento se ejecuta en caso de que el proceso de solicitus de inicio de sesión
      haya sido exitoso.
    PARAMETROS:
      r. Contiene el resultado del proceso de solicitud de inicio de sesión
    ******************************************************************************************/
    if (r.ok === 'true') {
      this.ru.navigate(['publicaciones']);
    } else {
      this.dlg.open(MensajeComponent, {data: {titulo: 'Inicio de sesion', mensaje: 'Error: ' + r.message}});
    }
  }
  public registroError(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Este proceso se ejecuta en caso de que el proceso de inicio de sesión haya fallado.
    PARAMETROS:
      e. contiene el resultado del proceso
    ******************************************************************************************/
    this.dlg.open(MensajeComponent, {data: {titulo: 'Error fatal', mensaje: 'Error: ' + e}});
  }

}
