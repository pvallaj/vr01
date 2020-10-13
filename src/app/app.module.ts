import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
//galeria de imagenes
import { NgxGalleryModule } from 'ngx-gallery-9';
import 'hammerjs';
//galeria de videos


//local

import { ConsultaComponent } from './seccion1/consulta/consulta.component';
import { VideoComponent } from './videoteca/video/video.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EncabezadoComponent } from './navegacion/encabezado/encabezado.component';
import { OpcionesComponent } from './navegacion/opciones/opciones.component';
import { Seccion1Component } from './seccion1/seccion1.component';
import { ConexionService } from './servicios/Conexion.service';
import { MnsjDetalleComponent } from './seccion1/mnsj-detalle/mnsj-detalle.component';
import { DetalleCatalogoComponent } from './seccion1/consulta/detalle-catalogo/detalle-catalogo.component';
import { CatalogoComponent } from './seccion1/consulta/catalogo/catalogo.component';
import { ListaCatalogoComponent } from './seccion1/consulta/lista-catalogo/lista-catalogo.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';
import { ConsDetSermonComponent } from './seccion2/cons-det-sermon/cons-det-sermon.component';

import { InicioComponent } from './navegacion/inicio/inicio.component';
import { SeguroPipe } from './pipes/seguro.pipe';
import { HtmlEnterPipe } from './pipes/htmlEnter.pipe';
import { SesionUsuario } from "./servicios/SesionUsuario.service";

import { MaterialModule } from './material.module';
import { FTGaleriaComponent } from './fototeca/ftgaleria/ftgaleria.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { LtsNoticiasComponent } from './privado/lts-noticias/lts-noticias.component';
import { RegistroUsuarioComponent } from './privado/registro-usuario/registro-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    VideoComponent,
    EncabezadoComponent,
    OpcionesComponent,
    Seccion1Component,
    MnsjDetalleComponent,
    DetalleCatalogoComponent,
    CatalogoComponent,
    ListaCatalogoComponent,
    ConsSermonesComponent,
    ConsDetSermonComponent,
    InicioComponent,
    FTGaleriaComponent,
    //pipes
    SeguroPipe,
    HtmlEnterPipe,
    BibliotecaComponent,
    LtsNoticiasComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,
    NgxGalleryModule
  ],
  providers: [
    ConexionService,
    SesionUsuario],
  bootstrap: [AppComponent]
})
export class AppModule { }
