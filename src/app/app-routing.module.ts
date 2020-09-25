import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaComponent } from './seccion1/consulta/consulta.component';
import { VideoComponent } from './seccion2/video/video.component';



const routes: Routes = [
  {path:'seccion1', component:ConsultaComponent},
  {path:'seccion2', component:VideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
