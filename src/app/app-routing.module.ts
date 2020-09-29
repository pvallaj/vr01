import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Seccion1Component } from './seccion1/seccion1.component';
import { VideoComponent } from './seccion2/video/video.component';



const routes: Routes = [
  {path:'seccion1', component:Seccion1Component},
  {path:'seccion2', component:VideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
