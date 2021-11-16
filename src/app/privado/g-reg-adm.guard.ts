import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionUsuario } from '../servicios/SesionUsuario.service';

@Injectable({
  providedIn: 'root',
})
export class GRegAdmGuard implements CanActivate {
  /******************************************************************************************
  DESCRIPCIÓN:
  Valida si el usuario es un administrador.
  ******************************************************************************************/
  constructor(private us: SesionUsuario, private router: Router) { }
  public canActivate() {
    if (this.us.role === 'admin') {
      return true;
    }
    return false;
  }

}
