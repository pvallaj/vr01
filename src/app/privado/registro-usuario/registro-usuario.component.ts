import { Component, Input, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Router } from '@angular/router';
import { SesionUsuario } from '../../servicios/SesionUsuario.service';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';


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
    private cnx:ConexionService, 
    private su:SesionUsuario,
    private fb:FormBuilder,
    private dlg: MatDialog,
    public canal:CanalService
    ) {

      this.crearForma();
  }
  guardar() { 
    if(this.canal.elemento!=null){
      //para actualización del usuario
      this.frm.value.id=this.canal.elemento.id; 
      this.frm.value.role=this.canal.elemento.role;
    this.cnx.usuarios(this.frm.value,'actualizar').subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
    }else{
      //para creación del registro
      this.frm.value.role='USUARIO';
      this.cnx.usuarios(this.frm.value,'crear').subscribe(data=>this.registroExitoso(data), err=>this.registroError(err));
    }
  }
  registroExitoso(r){ 
    if(r.ok=="true"){
      if(this.canal.elemento!=null){
        this.dlg.open(MensajeComponent, {data:{titulo: 'Actualización de datos de usuario', mensaje: 'El usuario se actualizado exitosamente.', tipo:1}});
        this.ru.navigate(['usuarios']);
        this.canal.elemento=null;
      }else{
        this.dlg.open(MensajeComponent, {data:{titulo: 'Registro de nuevo usuario', mensaje: 'El usuario se creo exitosamente. Espere la notificación de asignación de actividades. ', tipo:1}});
        if(this.su.role!=null){
          this.ru.navigate(['usuarios']);
        }else{
          this.ru.navigate(['sesion']);
        }
      }
      
    } else{
        this.dlg.open(MensajeComponent, {data:{titulo: 'Registro de nuevo usuario', mensaje: 'Error: '+r.message}});
    }

  }
  registroError(e){
    console.log("error en el registro");
  }
  cancelar() { 
    
  }
 
  crearForma(){
    let vals={
      //valor inicial, validaciones sincronas, validaciones asincronas
      nombre:[this.canal.elemento?.nombre,  [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      paterno:[this.canal.elemento?.paterno,[Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      materno:[this.canal.elemento?.materno,[Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      correo:[this.canal.elemento?.correo,  [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      telefono:[this.canal.elemento?.telefono,[Validators.required, 
        Validators.pattern('^[\\(]?[\\+]?(\\d{2}|\\d{3})[\\)]?[\\s]?((\\d{10}|\\d{10})|(\\d{3}[\\*\.\\-\\s]){2}\\d{3}|(\\d{2}[\\*\\.\\-\\s]){3}\\d{2}|(\\d{4}[\\*\\.\\-\\s]){1}\\d{4})|\\d{8}|\\d{10}|\\d{12}$')
      ]],
      contrasena:null
    };

    if(this.canal.elemento===null){
      vals.contrasena=['',[ Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.;_\\-])([A-Za-z\\d$@$!%*?&.#;_\\-|[^ ]){8,15}')]]
    }else{
      vals.contrasena=['',[ Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.;_\\-])([A-Za-z\\d$@$!%*?&.#;_\\-|[^ ]){8,15}')]]
    }
    this.frm=this.fb.group(vals);
    
  }

}
