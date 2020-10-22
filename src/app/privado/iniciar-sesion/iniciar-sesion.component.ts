import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Router } from '@angular/router';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {



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
    private dlg: MatDialog 
    ) {
  }
  registrarUsuario(dts) { 
    this.su.accesoUsuario({usuario:dts.usuario, contrasena:dts.password}).subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
  }
  registroExitoso(r){
    if(r.ok=='true'){
      this.ru.navigate(['publicaciones']);
    }else{
      this.dlg.open(MensajeComponent, {data:{titulo: 'Inicio de sesion', mensaje: 'Error: '+r.message}});
    }
  }
  registroError(e){
    console.log(e);
    this.dlg.open(MensajeComponent, {data:{titulo: 'Error fatal', mensaje: 'Error: '+e}});
  }
  
 

}
