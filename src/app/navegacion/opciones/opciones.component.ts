import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';

@Component({
  selector: 'app-opciones',
  styleUrls: ['./opciones.component.css'],
  templateUrl: './opciones.component.html',
})
export class OpcionesComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra las opciones disponibles, cuando la aplicación se muestra en pantallas pequeñas.
  ******************************************************************************************/
  @Output() public navBarToggle = new EventEmitter<void>();
  constructor(
    public sus: SesionUsuario,
    private r: Router) { }

  public ngOnInit(): void {
  }

  public onToggleNV() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Permite mostrar y ocultar el menu de opciones.
    ******************************************************************************************/
    this.navBarToggle.emit();
  }

  public salir() {
    this.sus.cerrarSesion();
    this.navBarToggle.emit();
    this.r.navigate(['inicio']);
  }

}
