import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionUsuario } from '../servicios/SesionUsuario.service';

@Injectable({
  providedIn: 'root',
})
export class GRegGuard implements CanActivate {
  /******************************************************************************************
  DESCRIPCIÓN
  Verifica si hay una sesión activa.

  PARAMETROS
  us. Objeto que contiene los datos de la sesión.

  RESULTADO
  True si el usuario existe y tiene un rol, false si no.

  ******************************************************************************************/
  constructor(private us: SesionUsuario, private router: Router) { }
  public canActivate() {
    if ( this.us.role) {
      return true;
    }
    return false;
  }
}
