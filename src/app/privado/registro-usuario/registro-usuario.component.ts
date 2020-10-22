import { Component, Input, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Router } from '@angular/router';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { DatosMsj } from '../../seccion1/mnsj-detalle/mnsj-detalle.component';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  frm:FormGroup;
  public tipopwd='password';
  ngOnInit(): void {
  }

  @Input() tipo:string;

  submitted =    false;
  ruteador :     Router;
  closeResult:   string;
  usuario:string="";
  password:string="";

  constructor( 
    private ru:Router, 
    private su:SesionUsuario, 
    private fb:FormBuilder,
    private dlg: MatDialog
    ) {
      console.log("llegamos al registro");
      this.crearForma();
  }
  guardar() { 
    console.log(this.frm);
    this.su.crearUsuario(this.frm.value).subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
  }
  registroExitoso(r){
    if(r.ok=="true")
      this.ru.navigate(['publicaciones']);
    else{
        this.dlg.open(MensajeComponent, {data:{titulo: 'Registro de nuevo usuario', mensaje: 'Error: '+r.message}});
    }

  }
  registroError(e){
    console.log("error en el registro");
  }
  cancelar() { 
    //console.log(this.frm);
    //this.su.registrarUsuario(dts.usuario, dts.password).subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
  }
 
  crearForma(){
    this.frm=this.fb.group({
      //valor inicial, validaciones sincronas, validaciones asincronas
      nombre:['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      paterno:['',[Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      materno:['',[Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      correo:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      telefono:['',[Validators.required, 
        Validators.pattern('^[\\(]?[\\+]?(\\d{2}|\\d{3})[\\)]?[\\s]?((\\d{10}|\\d{10})|(\\d{3}[\\*\.\\-\\s]){2}\\d{3}|(\\d{2}[\\*\\.\\-\\s]){3}\\d{2}|(\\d{4}[\\*\\.\\-\\s]){1}\\d{4})|\\d{8}|\\d{10}|\\d{12}$')
      ]],
      contrasena:['',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.;_\\-])([A-Za-z\\d$@$!%*?&.#;_\\-|[^ ]){8,15}')]]
    });
  }

}
