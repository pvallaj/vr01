import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionUsuario } from '../servicios/SesionUsuario.service';

@Injectable({
  providedIn: 'root',
})
export class GRegGuard implements CanActivate {
  /******************************************************************************************
  DESCRIPCIÓN:
  Valida si existe un usuario con permisos.
  ******************************************************************************************/
  constructor(private us: SesionUsuario, private router: Router) { }
  public canActivate() {
    if ( this.us.role) {
      return true;
    }
    return false;
  }
}
