import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-busq-avanzada-s',
  styleUrls: ['./busq-avanzada-s.component.css'],
  templateUrl: './busq-avanzada-s.component.html',
})
export class BusqAvanzadaSComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra la ventana que permite seleccionar al usuario los filtros que desea utilizar
  consultar las sermone.
  ******************************************************************************************/
  public filtros = {
    anio: false,
    autor: false,
    ciudad: false,
    dedicatarios: false,
    grabado: false,
    impresor: false,
    obra: false,
    orden: false,
    preliminares: false,
    ranios: false,
    thema: false,
    titulo: false,
  };
  public tipo = 'individuales';
  public fanios = false;
  public tipoAnios: string;
  public secVisible = '';

  constructor(public dialogRef: MatDialogRef<BusqAvanzadaSComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) { }

  public ngOnInit(): void {
    /******************************************************************************************
    DESCRIPCIÓN:
    Obtiene y muestra los filtros que estan activos actualmente.
    ******************************************************************************************/
    const fa = this.datos.filtros.value;

    this.tipo = 'individuales';
    this.filtros.autor =           fa.indexOf('Autor') >= 0 ? true : false;
    this.filtros.obra =            fa.indexOf('Obra') >= 0 ? true : false;
    this.filtros.titulo =          fa.indexOf('Titulo') >= 0 ? true : false;
    this.filtros.impresor =        fa.indexOf('Impresor') >= 0 ? true : false;
    this.filtros.preliminares =    fa.indexOf('Preliminares') >= 0 ? true : false;
    this.filtros.dedicatarios =    fa.indexOf('Dedicatarios') >= 0 ? true : false;
    this.filtros.ciudad =          fa.indexOf('Ciudad') >= 0 ? true : false;
    this.filtros.orden =           fa.indexOf('Orden') >= 0 ? true : false;
    this.filtros.thema =           fa.indexOf('Thema') >= 0 ? true : false;
    this.filtros.grabado =         fa.indexOf('Grabado') >= 0 ? true : false;

    if (fa.indexOf('Año') >= 0) {
        this.fanios = true;
        this.tipoAnios = 'anio';
      }
    if (fa.indexOf('Rango de años') >= 0) {
        this.fanios = true;
        this.tipoAnios = 'anios';
      }

  }

  public aceptar() {
      /******************************************************************************************
      DESCRIPCIÓN:
      Aplica los filtros seleccionados por el usuario, en este caso, implica que se muestren
      los campos de los filtros, en la pantalla de consulta de relaciones.
      ******************************************************************************************/
      this.datos.filtros.value = [];
      if (this.filtros.autor) {          this.datos.filtros.value.push('Autor'); }
      if (this.filtros.obra) {           this.datos.filtros.value.push('Obra'); }
      if (this.filtros.titulo) {         this.datos.filtros.value.push('Titulo'); }
      if (this.filtros.impresor) {       this.datos.filtros.value.push('Impresor'); }
      if (this.filtros.preliminares) {   this.datos.filtros.value.push('Preliminares'); }
      if (this.filtros.dedicatarios) {   this.datos.filtros.value.push('Dedicatarios'); }
      if (this.filtros.ciudad) {         this.datos.filtros.value.push('Ciudad'); }
      if (this.filtros.orden) {          this.datos.filtros.value.push('Orden'); }
      if (this.filtros.thema) {          this.datos.filtros.value.push('Thema'); }
      if (this.filtros.grabado) {        this.datos.filtros.value.push('Grabado'); }
      if (this.fanios) {
        if (this.tipoAnios === 'anio') {
          this.datos.filtros.value.push('Año');
        } else {
          this.datos.filtros.value.push('Rango de años');
        }
      }

  }

  public moAyuda(seccion) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Muestra y oculta el texto descriptivo de los filtros existentes en esta sección.
    PARAMETROS:
      seccion. Es el nombre de la sección que se muestra si esta oculta y viceversa.
    ******************************************************************************************/
    if (this.secVisible === seccion) {

      this.secVisible = '';
    } else {

      this.secVisible = seccion;
    }

  }

}
