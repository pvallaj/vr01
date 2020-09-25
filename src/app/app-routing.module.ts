import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaComponent } from './seccion1/consulta/consulta.component';
import { VideoComponent } from './seccion2/video/video.component';



const routes: Routes = [
  {path:'consulta', component:ConsultaComponent},
  {path:'videos', component:VideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
