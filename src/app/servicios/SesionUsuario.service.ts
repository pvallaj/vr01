import { Injectable }   from '@angular/core';
import { isDevMode } 	from '@angular/core';
import { map } from "rxjs/operators";
import { ConexionService	} 	from './Conexion.service';


@Injectable()
export class SesionUsuario{
	
	public usuario:string;
    public nombreUsuario:string;
    public acceso:string;
    public periodo:string;
    public mensajeError:string='' ;

    private roles:string;
    private estadoSesion:string='desconectado';
	private token:string;

	constructor(private cnx:ConexionService){
		this.usuario='';
	  	this.nombreUsuario='';
	  	this.roles='';
	}

	registrarUsuario(usr:string, paswd:string){
		console.log('Iniciando Sesión de usuario.'+usr+'--'+paswd);
		let ptrms=	{
			usuario:usr,
			contrasena:paswd
		};
		return this.cnx.ejecutar("registro", ptrms).pipe(
			map(resp=>{
				if(resp['ok']=='true'){
					localStorage.setItem('tkn',resp['resultado'].token);
					this.usuario=usr;
					this.estadoSesion='conectado';
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
		return true;
	}
	
	setUsuario(usuario:string){
	  	this.usuario=usuario;
	}
	getUsuario(){
	  	return this.usuario;
	}
	setNombreUsuario(nombreUsuario:string){
	  	this.nombreUsuario=nombreUsuario;
	}
	getNombreUsuario(){
	 	return this.nombreUsuario;
	}
	setRoles(roles:string){
	  	this.roles=roles;
	}
	getRoles(){
	  	return this.roles;
	}
	getEstadoSesion(){
		if(this.estadoSesion=='desconectado'){
			this.token=localStorage.getItem('tks');
			if(this.token!=null){
				this.estadoSesion='conectado';
			}
		}
	  	return this.estadoSesion;
	}
	obtUsuario(){ 
	  	return {...this};
	}
	validaPermiso(rol:string){
		if(this.roles.indexOf(rol,0)>=0)
			return true;
		else
			return false;
	}
}

