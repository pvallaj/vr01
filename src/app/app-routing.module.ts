import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './videoteca/video/video.component';

import { ConsultaNarrativasComponent } from './seccion1/cons-narrativas/consultaNarrativas.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';
import { HerramientasComponent } from './navegacion/herramientas/herramientas.component';

import { InicioComponent } from './navegacion/inicio/inicio.component';
import { RegistroUsuarioComponent } from './privado/registro-usuario/registro-usuario.component';
import { LtsNoticiasComponent } from './privado/lts-noticias/lts-noticias.component';
import { ListaUsuariosComponent } from './privado/lista-usuarios/lista-usuarios.component';
import { IniciarSesionComponent } from './privado/iniciar-sesion/iniciar-sesion.component';
import { OEscritaSXVIComponent } from './seccion3/oescrita/oescritaSXVI.component';
import { BuscarComponent } from './seccion3/buscar/buscar.component';
import { NoticiaComponent } from './privado/noticia/noticia.component';
import { NoticiasComponent } from './seccion3/noticias/noticias.component';
import { LineaDTComponent } from './seccion3/linea-dt/linea-dt.component';





const routes: Routes = [
  {path: 'inicio',         component: InicioComponent},
  {path: 'relaciones',     component: ConsultaNarrativasComponent},
  {path: 'sermones',       component: ConsSermonesComponent},
  {path: 'oesxvi',         component: OEscritaSXVIComponent},
  {path: 'herramientas',   component: HerramientasComponent},
  {path: 'buscar',         component: BuscarComponent},
  {path: 'noticias',       component: NoticiasComponent},
  {path: 'linea',          component: LineaDTComponent},
  //usuarios
  {path: 'registro',       component: RegistroUsuarioComponent},
  {path: 'sesion',         component: IniciarSesionComponent},
  {path: 'usuarios',       component: ListaUsuariosComponent},
  //noticias
  {path: 'publicar',       component: LtsNoticiasComponent},
  {path: 'crearNoticia',   component: NoticiaComponent},
  {path: 'modifNoticia',   component: NoticiaComponent},

  { path: '',   redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
