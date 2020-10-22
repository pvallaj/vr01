import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Seccion1Component } from './seccion1/seccion1.component';
import { VideoComponent } from './videoteca/video/video.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';
import { InicioComponent } from './navegacion/inicio/inicio.component';
import { FTGaleriaComponent } from './fototeca/ftgaleria/ftgaleria.component';
import { RegistroUsuarioComponent } from './privado/registro-usuario/registro-usuario.component';
import { LtsNoticiasComponent } from './privado/lts-noticias/lts-noticias.component';
import { IniciarSesionComponent } from './privado/iniciar-sesion/iniciar-sesion.component';



const routes: Routes = [
  {path:'inicio',         component:InicioComponent},
  {path:'textos',         component:Seccion1Component},
  {path:'sermones',       component:ConsSermonesComponent},
  {path:'videoteca',      component:VideoComponent},
  {path:'fototeca',       component:FTGaleriaComponent},
  {path:'publicaciones',  component:LtsNoticiasComponent},
  {path:'registro',       component:RegistroUsuarioComponent},
  {path:'sesion',         component:IniciarSesionComponent},
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
