import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  @Output() navBarToggle = new EventEmitter<void>();
  constructor(
    public su:SesionUsuario,
    private r:Router) { }

  ngOnInit(): void {
  }
  onToggleNV(){
    this.navBarToggle.emit();
  }

  salir(){
    this.su.cerrarSesion();
    this.navBarToggle.emit();
    this.r.navigate(['inicio']);
  }

}
