import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SesionUsuario } from "../../servicios/SesionUsuario.service";
import { CanalService } from "../../servicios/canal.service";
import { Router } from '@angular/router';
/*****************************************************************************************
  Descripción
    muestra la barra de navegación en la parte superior de la pantalla.
    Las opciones validas son:
    1. Menú. Se muestra cuando la pantalla es muy pequeña y se requiere del menú lateral para seleccionar alguna opción
    2. Buscar. Es una caja de texto que permite que el usuario proporcione un texto de consulta y realizar la misma.
    3. Siglo XVI
    4. Siglo XVII
    5. Siglo XVIII
    6. Herramientas. Opción para ir a las herramientas de bases de datos: relaciones y sermones.
    7. Liena de Tiempo. Muestra la linea de tiempo.
    8. Noticias. Muestra la sección de noticias.
    9. login. Es un icono de una persona, se muestra solo cuando no hay una sesión activa y permite ir a la opción de registro de acceso.
    10. Publicar. Solo aparece si hay una sesión activa y el usuario tiene el perfil de 'publicar' o 'admin', permite ir a la sección de publicar noticias.
    11. usuario. Solo aparece si hay una sesión activa y el usuairo tiene el perfil de 'admin'. Permite ir a la sección de administración de usuarios.
    12. Salir. Solo aparece si existe una sesión activa. Permite terminar la seción.
  Parametros
      ninguno
  Eventos
      navBarToggle. se dispara para notificar que se debe mostrar la barra de opciones laterales.
  Version: 1.0
  Fecha de liberación: 28/02/2021
  Registro de cambios:
******************************************************************************************/

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  @Output() navBarToggle = new EventEmitter<void>();
  constructor(public sus:SesionUsuario, public r:Router) { }

  
  

  ngOnInit(): void {
    
  }

  onToggleNV(){
    /*****************************************************************************************
      Descripción
        el usuario ha tocado el el boton de menú, para indicar que se debe mostrar o ocultar
      Parametros
        ninguno  
      Resultado
        ninguno
    ******************************************************************************************/
    this.navBarToggle.emit();
  }

  salir(){
    /*****************************************************************************************
      Descripción
        Esta opción indica que el usuario quiere terminar la sesión
      Parametros
        ninguno  
      Resultado
        ninguno
    ******************************************************************************************/
    this.sus.cerrarSesion();
    this.r.navigate(['inicio']);
  }

 

}
