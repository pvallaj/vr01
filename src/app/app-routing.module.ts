import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ConsultaNarrativasComponent } from './seccion1/cons-narrativas/consultaNarrativas.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';

import { InicioComponent } from './navegacion/inicio/inicio.component';
import { GRegAdmGuard } from './privado/g-reg-adm.guard';
import { GRegGuard } from './privado/g-reg.guard';
import { IniciarSesionComponent } from './privado/iniciar-sesion/iniciar-sesion.component';
import { ListaUsuariosComponent } from './privado/lista-usuarios/lista-usuarios.component';
import { LtsNoticiasComponent } from './privado/lts-noticias/lts-noticias.component';
import { NoticiaComponent } from './privado/noticia/noticia.component';
import { RegistroUsuarioComponent } from './privado/registro-usuario/registro-usuario.component';
import { PresentacioRelacionesComponent } from './seccion1/presentacio-relaciones/presentacio-relaciones.component';
import { PresentacioSermonesComponent } from './seccion2/presentacio-sermones/presentacio-sermones.component';

// import { OEscritaSXVIComponent } from './seccion3/oescrita/oescritaSXVI.component';
import { BuscarComponent } from './seccion3/buscar/buscar.component';
import { ContactosComponent } from './seccion3/contactos/contactos.component';
import { DInteresComponent } from './seccion3/dinteres/dinteres.component';
import { LineaDTComponent } from './seccion3/linea-dt/linea-dt.component';
import { NoticiasComponent } from './seccion3/noticias/noticias.component';
import { PublicacionesComponent } from './seccion3/publicaciones/publicaciones.component';

const routes: Routes = [
  {path: 'inicio',                  component: InicioComponent},
  {path: 'relaciones',              component: ConsultaNarrativasComponent},
  {path: 'PresentacionRelaciones',  component: PresentacioRelacionesComponent},
  {path: 'PresentacionSermones',    component: PresentacioSermonesComponent},
  {path: 'sermones',                component: ConsSermonesComponent},
  {path: 'publicaciones/:siglo/:tomo',  component: PublicacionesComponent},
  // {path: 'herramientas',            component: HerramientasComponent},
  {path: 'buscar',                  component: BuscarComponent},
  {path: 'noticias',                component: NoticiasComponent},
  {path: 'linea',                   component: LineaDTComponent},
  {path: 'deinteres',               component: DInteresComponent},
  {path: 'contactos',               component: ContactosComponent},
  // usuarios
  {path: 'registro',                component: RegistroUsuarioComponent},
  {path: 'sesion',                  component: IniciarSesionComponent},
  {path: 'usuarios',                component: ListaUsuariosComponent, canActivate: [GRegGuard, GRegAdmGuard]},
  // noticias
  {path: 'publicar',                component: LtsNoticiasComponent, canActivate: [GRegGuard]},
  {path: 'crearNoticia',            component: NoticiaComponent, canActivate: [GRegGuard]},
  {path: 'modifNoticia',            component: NoticiaComponent, canActivate: [GRegGuard]},

  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: InicioComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
