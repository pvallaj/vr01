import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Router } from '@angular/router';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {



  ngOnInit(): void {
  }

  @Input() tipo:string;

  submitted =    false;
  ruteador :     Router;
  closeResult:   string;
  usuario:string="";
  password:string="";

  constructor( private ru:Router, 
    private su:SesionUsuario, 
    ) {
      console.log("llegamos al registro");
  }
  registrarUsuario(dts) { 
    this.su.registrarUsuario(dts.usuario, dts.password).subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
  }
  registroExitoso(r){
    this.ru.navigate(['publicaciones']);
  }
  registroError(e){
    console.log("rror en el registro");
    console.log(e);
   //this.ds.cierraEspera();
  }
  
  salir() { 
   
  }
  salir_r(r){
    console.log("Cerrar sesion con exito: ");
    this.ru.navigate(['inicio']); 
  }

  autenticar(){
    //this.auth.google_signin();
  }

  mensajeErrorUsuario(){
    //this.sb.open('Error: El usuario no tiene permisos de accesos. Favor de consultar con el administrador',null,{duration:10000});
  }

}
