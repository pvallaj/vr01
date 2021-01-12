import { Injectable }   from '@angular/core';
import { isDevMode } 	from '@angular/core';
import { map } from "rxjs/operators";
import { ConexionService	} 	from './Conexion.service';


@Injectable()
export class SesionUsuario{
	
	private _usuario:string;
	private _role:string=null;

    private _nombreUsuario:string;
    public acceso:string;
    public periodo:string;
    public mensajeError:string='' ;
    
    private _estadoSesion:string='desconectado';
	private token:string;

	constructor(private cnx:ConexionService){
		this.token=localStorage.getItem('tkn');
		if(this.token!=null){
			this._usuario=			localStorage.getItem('usuario');
			this._nombreUsuario=	localStorage.getItem('nombre');
			this._role=				localStorage.getItem('role');
		}else{
			this._usuario=null;
			this._nombreUsuario=null;
			this._role=null;
		}
		console.log('sus:'+this._nombreUsuario);
	}

	accesoUsuario(datos:any){
		
		return this.cnx.usuarios(datos, "acceso").pipe(
			map(resp=>{
				if(resp['ok']=='true'){
					localStorage.setItem('tkn',		resp['resultado'].token);
					localStorage.setItem('usuario',	datos.correo);
					localStorage.setItem('nombre',	resp['resultado'].nombre);
					localStorage.setItem('role',	(resp['resultado'].role as string).toLowerCase());
					this._usuario=			datos.correo;
					this._nombreUsuario=	resp['resultado'].nombre;
					this._role=				(resp['resultado'].role as string).toLowerCase();
					this._estadoSesion='conectado';
				}
			  return resp;
			})
		  )
	}

	validaSesion(){
		this.cnx.ejecutar("registro",{
			accion:'validarSesion'
		}).subscribe(
			(resp:any)=>{
				console.log('autenticado');
				return true;
			},
			(ru:any)=>{
				console.log('Error de autenticacion');
			});
	}

	cerrarSesion(){
		localStorage.removeItem('tkn');
		localStorage.removeItem('usuario');
		localStorage.removeItem('nombre');
		localStorage.removeItem('role');
		this._nombreUsuario='';
		this._role='';
		this._usuario='';
		this._estadoSesion='desconectado';
		return true;
	}
	

	crearUsuario(datos:any){
		datos.role='USUARIO';
		datos.accion='crear';
		return this.cnx.usuarios(datos,'crear').pipe(
			map(resp=>{
				if(resp['ok']=='true'){
					this._usuario=datos.correo;
				}
			  return resp;
			})
		  )
	}
	
	set nombreUsuario(nombreUsuario:string){
	  	this._nombreUsuario=nombreUsuario;
	}
	get nombreUsuario(){
	 	return this._nombreUsuario;
	}

	get role(){
	  	return this._role;
	}
	get estadoSesion(){
		if(this._estadoSesion=='desconectado'){
			this.token=localStorage.getItem('tkn');
			if(this.token!=null){
				this._estadoSesion='conectado';
			}
		}
	  	return this._estadoSesion;
	}
	obtUsuario(){ 
	  	return {...this};
	}
	
}

