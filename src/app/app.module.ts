import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSplitModule } from 'angular-split';
import 'hammerjs';
// PDF
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// local
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EncabezadoComponent } from './navegacion/encabezado/encabezado.component';
import { OpcionesComponent } from './navegacion/opciones/opciones.component';
import { ConsultaNarrativasComponent } from './seccion1/cons-narrativas/consultaNarrativas.component';
import { ConsDetSermonComponent } from './seccion2/cons-det-sermon/cons-det-sermon.component';
import { ConsSermonesComponent } from './seccion2/cons-sermones/cons-sermones.component';
import { ConexionService } from './servicios/Conexion.service';

// pipes
//
import { InicioComponent } from './navegacion/inicio/inicio.component';
import { HtmlSeguroPipe } from './pipes/htmlSeguro.pipe';
import { RecortaTextoPipe } from './pipes/recorta.pipe';
import { ResaltaTextoPipe } from './pipes/ResaltaTexto.pipe';
import { SeguroPipe } from './pipes/seguro.pipe';
import { CanalService } from './servicios/canal.service';
import { APIInterceptor } from './servicios/jwt.interceptor';
import { SesionUsuario } from './servicios/SesionUsuario.service';

import { MensajeComponent } from './generales/mensaje/mensaje.component';
import { MaterialModule } from './material.module';
import { IniciarSesionComponent } from './privado/iniciar-sesion/iniciar-sesion.component';
import { ListaUsuariosComponent } from './privado/lista-usuarios/lista-usuarios.component';
import { LtsNoticiasComponent } from './privado/lts-noticias/lts-noticias.component';
import { RegistroUsuarioComponent } from './privado/registro-usuario/registro-usuario.component';
import { ConsDetNarrativaComponent } from './seccion1/cons-det-narrativa/cons-det-narrativa.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EsperaComponent } from './generales/espera/espera.component';
import { TCComponent } from './generales/imagen-tc/tc.component';
import { HerramientasComponent } from './navegacion/herramientas/herramientas.component';
import { NoticiaComponent } from './privado/noticia/noticia.component';
import { BusqAvanzadaComponent } from './seccion1/busq-avanzada/busq-avanzada.component';
import { MapaContextoComponent } from './seccion1/mapa-contexto/mapa-contexto.component';
import { MapaSignosComponent } from './seccion1/mapa-signos/mapa-signos.component';
import { MapaVinculosComponent } from './seccion1/mapa-vinculos/mapa-vinculos.component';
import { PresentacioRelacionesComponent } from './seccion1/presentacio-relaciones/presentacio-relaciones.component';
import { BusqAvanzadaSComponent } from './seccion2/busq-avanzada-s/busq-avanzada-s.component';
import { PresentacioSermonesComponent } from './seccion2/presentacio-sermones/presentacio-sermones.component';
import { BuscarComponent } from './seccion3/buscar/buscar.component';
import { ContactosComponent } from './seccion3/contactos/contactos.component';
import { CreditosComponent } from './seccion3/creditos/creditos.component';
import { DetalleOEComponent } from './seccion3/detalle-oe/detalle-oe.component';
import { DInteresComponent } from './seccion3/dinteres/dinteres.component';
import { ImagenesSLDComponent } from './seccion3/imagenes-sld/imagenes-sld.component';
import { ImgDetSldComponent } from './seccion3/img-det-sld/img-det-sld.component';
import { IsotipoComponent } from './seccion3/isotipo/isotipo.component';
import { LineaDTComponent } from './seccion3/linea-dt/linea-dt.component';
import { NoticiasSLDComponent } from './seccion3/noticias-sld/noticias-sld.component';
import { NoticiasComponent } from './seccion3/noticias/noticias.component';
import { PublicacionesComponent } from './seccion3/publicaciones/publicaciones.component';
import { UtilS } from './servicios/Util.service';
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EncabezadoComponent,
    OpcionesComponent,
    ConsSermonesComponent,
    ConsDetSermonComponent,
    InicioComponent,
    // pipes
    SeguroPipe,
    ResaltaTextoPipe,
    RecortaTextoPipe,
    HtmlSeguroPipe,
    // otros
    LtsNoticiasComponent,
    RegistroUsuarioComponent,
    IniciarSesionComponent,
    MensajeComponent,
    ListaUsuariosComponent,
    ConsDetNarrativaComponent,
    ConsultaNarrativasComponent,
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
    DInteresComponent,
    ContactosComponent,
    PresentacioRelacionesComponent,
    PresentacioSermonesComponent,
    NoticiasSLDComponent,
    ImagenesSLDComponent,
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
    DragDropModule,
    AngularSplitModule,
    PdfViewerModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
    },
    ConexionService,
    SesionUsuario,
    CanalService,
    UtilS],

})
export class AppModule { }
