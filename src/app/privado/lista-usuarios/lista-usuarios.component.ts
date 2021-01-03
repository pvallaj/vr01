import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { ConexionService } from '../../servicios/Conexion.service';
import { Router } from '@angular/router';

import {MatDialog, } from '@angular/material/dialog';
import { MensajeComponent } from '../../generales/mensaje/mensaje.component';
import { CanalService } from '../../servicios/canal.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  public estaCargando=false;
  public estaProcesando=false;
  public columnasVisibles: string[] = ['id','nombre','paterno','materno','correo','telefono', 'role'];
  public usuarios:any[]=[];

  public seleccionado:any;

  selection = new SelectionModel<any>(true, []);


  constructor(private cnx: ConexionService, private r:Router, public dialog: MatDialog, private canal:CanalService) { }

  ngOnInit(): void {
    this.estaCargando = true;
    this.cnx.usuarios(null,'obtener usuarios')
    .subscribe(
      (datos)=>{
        this.usuarios=datos['resultado'];
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando=false;
      }
    )
  }

  public seleccionar(e:any){
    this.seleccionado=e;
  }
  
  public agregarUsuario(){
    this.r.navigate(['registro']);
  }

  public eliminarUsuario(){

    if(this.seleccionado===undefined){
      const dialogRef = this.dialog.open(MensajeComponent, {
        data: {titulo:'Eliminar Usuario', mensaje:'Debe seleccionar al usuarios que desea eliminar dando un CLICK sobre el registro', tipo:1}
      });
      return;  
    }

    const dialogRef = this.dialog.open(MensajeComponent, {
      data: {titulo:'Eliminar Usuario', mensaje:'El usuario:\n '
      +this.seleccionado.nombre.toUpperCase()+'  '
      +this.seleccionado.paterno.toUpperCase()+'  '
      +this.seleccionado.materno.toUpperCase()+'  ('
      +this.seleccionado.correo.toUpperCase()+') \n Será eliminado de forma definitiva. ¿Desea continuar?', tipo:2}
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado==='no') return;
      this.estaProcesando = true;
      this.cnx.usuarios({id:this.seleccionado.id},'eliminar')
      .subscribe(
        (datos)=>{
          const dialogRef = this.dialog.open(MensajeComponent, {
            data: {titulo:'Eliminar Usuario', mensaje:'El resgistro fue eliminado EXITOSAMENTE', tipo:1}
          });
          this.usuarios=this.usuarios.filter(reg=>reg.id!=this.seleccionado.id);
          this.seleccionado==null;
          this.estaProcesando=false;
        },
      (error)=>{
          console.log('No se logro la conexión');
          console.error(error);
          this.estaProcesando=false;
        }
      )
    });
  }

  public cambiarRoleUsuario(){

    if(this.seleccionado===undefined){
      const dialogRef = this.dialog.open(MensajeComponent, {
        data: {titulo:'Cambiar Perfil', mensaje:'Debe seleccionar al usuarios que desea modificar dando un CLICK sobre el registro', tipo:1}
      });
      return;  
    }

    const dialogRef = this.dialog.open(MensajeComponent, {
      data: {titulo:'Cambiar perfil', mensaje:'El usuario:\n'
      +this.seleccionado.nombre.toUpperCase()+'  '
      +this.seleccionado.paterno.toUpperCase()+'  '
      +this.seleccionado.materno.toUpperCase()+'  ('
      +this.seleccionado.correo.toUpperCase()+') \nTiene el perfil: "'
      +this.seleccionado.role.toUpperCase()+'" y cambiará a: "'
      + (this.seleccionado.role.toUpperCase()=='USUARIO'?'PUBLICAR':'USUARIO')
      +'". ¿Desea continuar?', tipo:2}
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado==='no') return;
      this.estaProcesando = true;
      this.cnx.usuarios({id:this.seleccionado.id, role:this.seleccionado.role.toUpperCase()=='USUARIO'?'PUBLICAR':'USUARIO'},'cambiar perfil')
      .subscribe(
        (datos)=>{
          const dialogRef = this.dialog.open(MensajeComponent, {
            data: {titulo:'Cambiar perfil', mensaje:'El resgistro fue actualizado EXITOSAMENTE', tipo:1}
          });
          
          this.seleccionado.role=this.seleccionado.role.toUpperCase()=='USUARIO'?'PUBLICAR':'USUARIO';

          console.log(this.seleccionado);
          this.estaProcesando=false;
        },
      (error)=>{
          console.log('No se logro la conexión');
          console.error(error);
          this.estaProcesando=false;
        }
      )
    });
  }

  public actualizarUsuario(){

    if(this.seleccionado===undefined){
      const dialogRef = this.dialog.open(MensajeComponent, {
        data: {titulo:'Actualizar Usuario', mensaje:'Debe seleccionar al usuarios que desea modificar dando un CLICK sobre el registro', tipo:1}
      });
      return;  
    }
    this.canal.elemento={... this.seleccionado};
    this.r.navigate(['registro']);
  }

  public cambiarRolUsuario(){
    const dialogRef = this.dialog.open(MensajeComponent, {
      width: '300px',
      data: {titulo:'Eliminar Usuario', mensaje:'El usuario será eliminado de forma definitiva. ¿Desea continuar?', tipo:2}
    });

    dialogRef.afterClosed().subscribe(result => {
            
    });
  }
}

