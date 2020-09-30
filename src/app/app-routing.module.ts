import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Seccion1Component } from './seccion1/seccion1.component';
import { VideoComponent } from './videoteca/video/video.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';
import { InicioComponent } from './navegacion/inicio/inicio.component';



const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'textos', component:Seccion1Component},
  {path:'sermones', component:ConsSermonesComponent},
  {path:'video', component:ConsSermonesComponent},
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
