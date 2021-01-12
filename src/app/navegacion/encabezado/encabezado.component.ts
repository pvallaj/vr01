import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SesionUsuario } from "../../servicios/SesionUsuario.service";
import { CanalService } from "../../servicios/canal.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  @Output() navBarToggle = new EventEmitter<void>();
  constructor(public sus:SesionUsuario, private r:Router, private cc:CanalService) { }

  public txtbuscar:string;

  ngOnInit(): void {
    console.log(this.sus.role);
  }

  onToggleNV(){
    this.navBarToggle.emit();
  }

  salir(){
    this.sus.cerrarSesion();
    this.r.navigate(['inicio']);
  }

  public buscarTermino(e:any){
    //console.log(this.txtbuscar);
    this.cc.terminoConsulta=this.txtbuscar;
    this.r.navigate(['/buscar']);
    this.cc.sendMessage(this.txtbuscar);
  }

}
