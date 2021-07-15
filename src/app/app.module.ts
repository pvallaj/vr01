import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSplitModule } from 'angular-split';
//PDF
import { PdfViewerModule } from 'ng2-pdf-viewer';
//galeria de imagenes
import { NgxGalleryModule } from 'ngx-gallery-9';
import 'hammerjs';
//galeria de videos

//Vista de arbol
import { TreeviewModule } from "ngx-treeview";

//ToolTip

import {TooltipModule} from 'ng2-tooltip-directive';

//local

import { ConsultaComponent } from './seccion1/consulta/consulta.component';
import { VideoComponent } from './videoteca/video/video.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EncabezadoComponent } from './navegacion/encabezado/encabezado.component';
import { OpcionesComponent } from './navegacion/opciones/opciones.component';
import { ConsultaNarrativasComponent } from './seccion1/cons-narrativas/consultaNarrativas.component';
import { ConexionService } from './servicios/Conexion.service';
import { MnsjDetalleComponent } from './seccion1/mnsj-detalle/mnsj-detalle.component';
import { DetalleCatalogoComponent } from './seccion1/consulta/detalle-catalogo/detalle-catalogo.component';
import { CatalogoComponent } from './seccion1/consulta/catalogo/catalogo.component';
import { ListaCatalogoComponent } from './seccion1/consulta/lista-catalogo/lista-catalogo.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';
import { ConsDetSermonComponent } from './seccion2/cons-det-sermon/cons-det-sermon.component';

//pipes
import { SeguroPipe } from './pipes/seguro.pipe';
import { HtmlSeguroPipe } from './pipes/htmlSeguro.pipe';
import { ResaltaTextoPipe } from './pipes/ResaltaTexto.pipe';
import { RecortaTextoPipe } from './pipes/recorta.pipe';
//
import { InicioComponent } from './navegacion/inicio/inicio.component';
import { SesionUsuario } from "./servicios/SesionUsuario.service";
import { CanalService } from './servicios/canal.service';
import { APIInterceptor } from './servicios/jwt.interceptor';

import { MaterialModule } from './material.module';
import { FTGaleriaComponent } from './fototeca/ftgaleria/ftgaleria.component';
import { LtsNoticiasComponent } from './privado/lts-noticias/lts-noticias.component';
import { RegistroUsuarioComponent } from './privado/registro-usuario/registro-usuario.component';
import { IniciarSesionComponent } from './privado/iniciar-sesion/iniciar-sesion.component';
import { MensajeComponent } from './generales/mensaje/mensaje.component';
import { ListaUsuariosComponent } from './privado/lista-usuarios/lista-usuarios.component';
import { ConsDetNarrativaComponent } from './seccion1/cons-det-narrativa/cons-det-narrativa.component';
import { OEscritaSXVIComponent } from './seccion3/oescrita/oescritaSXVI.component';
import { BuscarComponent } from './seccion3/buscar/buscar.component';
import { HerramientasComponent } from './navegacion/herramientas/herramientas.component';
import { DetalleOEComponent } from './seccion3/detalle-oe/detalle-oe.component';
import { NoticiasComponent } from './seccion3/noticias/noticias.component';
import { EsperaComponent } from './generales/espera/espera.component';
import { NoticiaComponent } from './privado/noticia/noticia.component';
import { UtilS } from './servicios/Util.service';
import { TCComponent } from './generales/imagen-tc/tc.component';
import { LineaDTComponent } from './seccion3/linea-dt/linea-dt.component';
import { BusqAvanzadaComponent } from './seccion1/busq-avanzada/busq-avanzada.component';
import { BusqAvanzadaSComponent } from './seccion2/busq-avanzada-s/busq-avanzada-s.component';
import { MapaSignosComponent } from './seccion1/mapa-signos/mapa-signos.component';
import { MapaVinculosComponent } from './seccion1/mapa-vinculos/mapa-vinculos.component';
import { MapaContextoComponent } from './seccion1/mapa-contexto/mapa-contexto.component';
import { OEscritaV2Component } from './seccion3/oescrita-v2/oescrita-v2.component';
import { DInteresComponent } from './seccion3/dinteres/dinteres.component';
import { ContactosComponent } from './seccion3/contactos/contactos.component';
import { OescritaV3Component } from './seccion3/oescrita-v3/oescrita-v3.component';
import { PresentacioRelacionesComponent } from './seccion1/presentacio-relaciones/presentacio-relaciones.component';
import { PresentacioSermonesComponent } from './seccion2/presentacio-sermones/presentacio-sermones.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NoticiasSLDComponent } from './seccion3/noticias-sld/noticias-sld.component';
import { ImagenesSLDComponent } from './seccion3/imagenes-sld/imagenes-sld.component';
import { OescritaV4Component } from './seccion3/oescrita-v4/oescrita-v4.component';
import { ImgDetSldComponent } from './seccion3/img-det-sld/img-det-sld.component';
import { PublicacionesComponent } from './seccion3/publicaciones/publicaciones.component';
import { CreditosComponent } from './seccion3/creditos/creditos.component';
import { IsotipoComponent } from './seccion3/isotipo/isotipo.component';
@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
    VideoComponent,
    EncabezadoComponent,
    OpcionesComponent,
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
    ResaltaTextoPipe,
    RecortaTextoPipe,
    HtmlSeguroPipe,
    //otros
    LtsNoticiasComponent,
    RegistroUsuarioComponent,
    IniciarSesionComponent,
    MensajeComponent,
    ListaUsuariosComponent,
    ConsDetNarrativaComponent,
    ConsultaNarrativasComponent,
    OEscritaSXVIComponent,
    BuscarComponent,
    HerramientasComponent,
    DetalleOEComponent,
    NoticiasComponent,
    EsperaComponent,
    NoticiaComponent,
    TCComponent,
    LineaDTComponent,
    BusqAvanzadaComponent,
    BusqAvanzadaSComponent,
    MapaSignosComponent,
    MapaVinculosComponent,
    MapaContextoComponent,
    OEscritaV2Component,
    DInteresComponent,
    ContactosComponent,
    OescritaV3Component,
    PresentacioRelacionesComponent,
    PresentacioSermonesComponent,
    NoticiasSLDComponent,
    ImagenesSLDComponent,
    OescritaV4Component,
    ImgDetSldComponent,
    PublicacionesComponent,
    CreditosComponent,
    IsotipoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    NgxGalleryModule,
    TreeviewModule.forRoot(),
    DragDropModule,
    AngularSplitModule,
    PdfViewerModule,

    TooltipModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, 
      useClass: APIInterceptor, 
      multi:true},
    ConexionService,
    SesionUsuario,
    CanalService,
    UtilS],
  bootstrap: [AppComponent]
})
export class AppModule { }
