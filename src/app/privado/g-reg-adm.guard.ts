import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionUsuario } from '../servicios/SesionUsuario.service';

@Injectable({
  providedIn: 'root',
})
export class GRegAdmGuard implements CanActivate {
  /******************************************************************************************
  DESCRIPCIÓN
  Verifica si el usuario con la sesión actual es un administrador.

  PARAMETROS
  us. Objeto que contiene los datos de la sesión.

  RESULTADO
  True si el usuario es administración, false si no.

  ******************************************************************************************/
  constructor(private us: SesionUsuario, private router: Router) { }
  public canActivate() {
    if (this.us.role === 'admin') {
      return true;
    }
    return false;
  }

}
