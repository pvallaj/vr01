import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionUsuario } from '../servicios/SesionUsuario.service';

@Injectable({
  providedIn: 'root'
})
export class GRegAdmGuard implements CanActivate {
  constructor(private us: SesionUsuario, private router: Router) { }
  canActivate() {
    if(this.us.role=="admin"){
      return true;
    }
    return false;
  }
  
}
