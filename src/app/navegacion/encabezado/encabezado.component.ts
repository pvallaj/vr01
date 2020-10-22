import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SesionUsuario } from "../../servicios/SesionUsuario.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  @Output() navBarToggle = new EventEmitter<void>();
  constructor(public sus:SesionUsuario, private r:Router) { }

  ngOnInit(): void {
  }

  onToggleNV(){
    this.navBarToggle.emit();
  }

  salir(){
    this.sus.cerrarSesion();
    this.r.navigate(['inicio']);
  }

}
