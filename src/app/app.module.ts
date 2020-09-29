import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// MAterial
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatList, MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
//bootstrap 10
import {NgbPaginationModule, NgbAlertModule, NgbNav} from '@ng-bootstrap/ng-bootstrap';

//local
import { MatChipsModule} from '@angular/material/chips';
import { ConsultaComponent } from './seccion1/consulta/consulta.component';
import { VideoComponent } from './seccion2/video/video.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EncabezadoComponent } from './navegacion/encabezado/encabezado.component';
import { OpcionesComponent } from './navegacion/opciones/opciones.component';
import { Seccion1Component } from './seccion1/seccion1.component';
import { ConexionService } from './servicios/conexion.service';
import { MnsjDetalleComponent } from './seccion1/mnsj-detalle/mnsj-detalle.component';
import { DetalleCatalogoComponent } from './seccion1/consulta/detalle-catalogo/detalle-catalogo.component';
import { CatalogoComponent } from './seccion1/consulta/catalogo/catalogo.component';
import { ListaCatalogoComponent } from './seccion1/consulta/lista-catalogo/lista-catalogo.component';


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
    ListaCatalogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //Material
    MatSliderModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [ConexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
