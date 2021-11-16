import { Component, Input } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';

@Component({
  selector: 'app-registro-usuario',
  styleUrls: ['./registro-usuario.component.css'],
  templateUrl: './registro-usuario.component.html',
})
export class RegistroUsuarioComponent {
  /******************************************************************************************
  DESCRIPCIÓN:
    Permite obtener los datos del usuario para su registro. los datos son:
    nombre,
    apellido paterno,
    apellido materno,
    correo,
    telefono,
    contraseña
  ******************************************************************************************/
  @Input() public tipo: string;

  public frm: FormGroup;
  public tipopwd = 'password';
  public submitted =    false;
  public ruteador: Router;
  public closeResult: string;
  public usuario = '';
  public password = '';

  constructor(
    private ru: Router,
    private cnx: ConexionService,
    private su: SesionUsuario,
    private fb: FormBuilder,
    private dlg: MatDialog,
    public canal: CanalService,
    ) {

      this.crearForma();
  }
  public guardar() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite guardar los datos introducidos por el usuario, ya sea para crear un registro
      nuevo o para modificar datos existentes.
    ******************************************************************************************/

    if (this.canal.elemento != null) {
      // para actualización del usuario
      this.frm.value.id = this.canal.elemento.id;
      this.frm.value.role = this.canal.elemento.role;
      this.cnx.usuarios(this.frm.value, 'actualizar').subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
    } else {
      // para creación del registro
      this.frm.value.role = 'USUARIO';
      this.cnx.usuarios(this.frm.value, 'crear').subscribe((data) => this.registroExitoso(data), (err) => this.registroError(err));
    }
  }
  public registroExitoso(r) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Se ejecuta si el proceso de guardar los datos del usuario fue exitosa.
      En caso de que el alta haya sido por un administrador, se direcciona a la lista de usuairos.
      Si el registro No lo realiza un administrador, se dirige a la opción de inicio de seción.
    ******************************************************************************************/
    if (r.ok === 'true') {
      if (this.canal.elemento != null) {
        this.dlg.open(MensajeComponent, {data: {
          mensaje: 'El usuario se actualizado exitosamente.',
          tipo: 1,
          titulo: 'Actualización de datos de usuario',
        }});
        this.ru.navigate(['usuarios']);
        this.canal.elemento = null;
      } else {
        this.dlg.open(MensajeComponent, {data: {
          mensaje: 'El usuario se creo exitosamente. Espere la notificación de asignación de actividades. ',
          tipo: 1,
          titulo: 'Registro de nuevo usuario',
        }});
        if (this.su.role != null) {
          this.ru.navigate(['usuarios']);
        } else {
          this.ru.navigate(['sesion']);
        }
      }

    } else {
        this.dlg.open(MensajeComponent, {data: {titulo: 'Registro de nuevo usuario', mensaje: 'Error: ' + r.message}});
    }

  }
  public registroError(e) {
    console.log('error en el registro');
  }
  public cancelar() {

  }

  public crearForma() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Construye la forma que obtendra los datos del usuario.
    ******************************************************************************************/
    const vals = {
      // valor inicial, validaciones sincronas, validaciones asincronas
      contrasena: null,
      correo: [this.canal.elemento?.correo,  [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      materno: [this.canal.elemento?.materno, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      nombre: [this.canal.elemento?.nombre,  [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      paterno: [this.canal.elemento?.paterno, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      telefono: [this.canal.elemento?.telefono, [Validators.required,
        Validators.pattern('^[\\(]?[\\+]?(\\d{2}|\\d{3})[\\)]?[\\s]?((\\d{10}|\\d{10})|(\\d{3}[\\*\.\\-\\s]){2}\\d{3}|(\\d{2}[\\*\\.\\-\\s]){3}\\d{2}|(\\d{4}[\\*\\.\\-\\s]){1}\\d{4})|\\d{8}|\\d{10}|\\d{12}$'),
      ]],
    };

    if (this.canal.elemento === null) {
      vals.contrasena = ['', [ Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.;_\\-])([A-Za-z\\d$@$!%*?&.#;_\\-|[^ ]){8,15}')]];
    } else {
      vals.contrasena = ['', [ Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.;_\\-])([A-Za-z\\d$@$!%*?&.#;_\\-|[^ ]){8,15}')]];
    }
    this.frm = this.fb.group(vals);

  }

}
