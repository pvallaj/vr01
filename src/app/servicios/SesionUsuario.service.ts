import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConexionService	} from './Conexion.service';

@Injectable()
export class SesionUsuario {
  /******************************************************************************************
    DESCRIPCIÓN:
    Permite el manejo de la sesión de usuario.
  ******************************************************************************************/
  private _usuario: string;
  private _role: string = null;

  private _nombreUsuario: string;
  public acceso: string;
  public periodo: string;
  public mensajeError = '' ;

  private _estadoSesion = 'desconectado';
  private token: string;

  constructor(private cnx: ConexionService) {
    this.token = localStorage.getItem('tkn');
    if (this.token != null) {
      this._usuario =			localStorage.getItem('usuario');
      this._nombreUsuario =	localStorage.getItem('nombre');
      this._role =				localStorage.getItem('role');
    } else {
      this._usuario = null;
      this._nombreUsuario = null;
      this._role = null;
    }
  }

  public accesoUsuario(datos: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace la solicitud para el inicio de sesión de un usuario.
      En caso de que la solicitud sea exitosa, se obtienen los datos de seción del usuario.
    PARAMETROS:
      datos: contiene las credenciales del usuario: correo y contraseña.
    RESULTADO:
      Los datos de la sesión del usuario
    ******************************************************************************************/
    return this.cnx.usuarios(datos, 'acceso').pipe(
      map((resp) => {
        if (resp['ok'] === 'true') {
          localStorage.setItem('tkn',		resp['resultado'].token);
          localStorage.setItem('usuario',	datos.correo);
          localStorage.setItem('nombre',	resp['resultado'].nombre);
          localStorage.setItem('role',	(resp['resultado'].role as string).toLowerCase());
          this._usuario =			datos.correo;
          this._nombreUsuario =	resp['resultado'].nombre;
          this._role =				(resp['resultado'].role as string).toLowerCase();
          this._estadoSesion = 'conectado';
        }
        return resp;
      }),
    );
  }

  public validaSesion() {
    /******************************************************************************************
    DESCRIPCIÓN:
      valida si existe una sesión activa. NO SE USA.
    ******************************************************************************************/
    this.cnx.ejecutar('registro', {
      accion: 'validarSesion',
    }).subscribe(
      (resp: any) => {
        return true;
      },
      (ru: any) => {

      });
  }

  public cerrarSesion() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Elimina una sesión de usuario. Esto implica eliminar los datos de sesión del navegador
      desde el acual se invoca el procedimiento.
    PARAMETROS:
      Ninguno
    RESULTADO:
      Ninguno
    ******************************************************************************************/
    localStorage.removeItem('tkn');
    localStorage.removeItem('usuario');
    localStorage.removeItem('nombre');
    localStorage.removeItem('role');
    this._nombreUsuario = '';
    this._role = '';
    this._usuario = '';
    this._estadoSesion = 'desconectado';
    return true;
  }

  public crearUsuario(datos: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Hace la solicitud para la creación de un nuevo usuario.
    PARAMETROS:
      datos. Contiene la información del usuario que se va a crear. Los datos son: nombre,
      apellido paterno, apellido materno, correo, telefono y contraseña. Los datos se envian
      en una estructura de la forma:
      {nombre, paterno, materno, correo, telefono}
    RESULTADO:
      los datos del usuario + id del nuevo usuario.
    ******************************************************************************************/
    datos.role = 'USUARIO';
    datos.accion = 'crear';
    return this.cnx.usuarios(datos, 'crear').pipe(
      map((resp) => {
        if (resp['ok'] === 'true') {
          this._usuario = datos.correo;
        }
        return resp;
      }),
      );
  }

  set nombreUsuario(nombreUsuario: string) {
      // asignación del nombre de usuario
      this._nombreUsuario = nombreUsuario;
  }
  get nombreUsuario() {
     // obtención del nombre de usuario.
    return this._nombreUsuario;
  }

  get role() {
      // obtención de los roles del usuario activo.
      return this._role;
  }
  get estadoSesion() {
    // obtiene el estado de la seción.
    if (this._estadoSesion === 'desconectado') {
      this.token = localStorage.getItem('tkn');
      if (this.token != null) {
        this._estadoSesion = 'conectado';
      }
    }
    return this._estadoSesion;
  }

  public obtUsuario() {
      // obtiene los datos del usuario actual.
      return {...this};
  }

}
