import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-busq-avanzada',
  styleUrls: ['./busq-avanzada.component.css'],
  templateUrl: './busq-avanzada.component.html',
})
export class BusqAvanzadaComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra las opciones de busqueda avanzada, de esta forma el usuario puede seleccionar
  los filtros que desea usar en su consulta.
  ******************************************************************************************/
  public filtros = {
    autor: false,
    clasificacion: false,
    motivo: false,
    obra: false,
    signos: false,
    soporte: false,
    tema: false,
    texto: false,
    tipoAccion: false,
    tipoVerso: false,
  };
  public tipo = 'individuales';
  public secVisible = '';

  constructor(public dialogRef: MatDialogRef<BusqAvanzadaComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any) { }

  public ngOnInit(): void {
    /******************************************************************************************
    DESCRIPCIÓN:
    configura los filtros actualmente activos para mostrarlos al usuario.
    ******************************************************************************************/
    const fa = this.datos.filtros.value;
    if (fa.indexOf('Signos Actorales') >= 0) {
      this.tipo = 'signos';
      this.filtros.autor = false;
      this.filtros.obra = false;
      this.filtros.clasificacion = false;
      this.filtros.tema = false;
      this.filtros.tipoVerso = false;
      this.filtros.tipoAccion = false;
      this.filtros.soporte = false;
      this.filtros.texto = false;
    } else {
      this.tipo = 'individuales';
      this.filtros.autor =           fa.indexOf('Autor') >= 0 ? true : false;
      this.filtros.obra =            fa.indexOf('Obra') >= 0 ? true : false;
      this.filtros.clasificacion =   fa.indexOf('Clasificación') >= 0 ? true : false;
      this.filtros.tema =            fa.indexOf('Tema') >= 0 ? true : false;
      this.filtros.motivo =          fa.indexOf('Motivo') >= 0 ? true : false;
      this.filtros.tipoVerso =       fa.indexOf('Tipo de Verso') >= 0 ? true : false;
      this.filtros.tipoAccion =      fa.indexOf('Tipo de Acción') >= 0 ? true : false;
      this.filtros.soporte =         fa.indexOf('Soporte') >= 0 ? true : false;
      this.filtros.texto =           fa.indexOf('Textos o Palabras') >= 0 ? true : false;

    }
  }
  public tipos(e) {
    if (this.tipo === 'signos') {
      this.filtros.autor = false;
      this.filtros.obra = false;
      this.filtros.clasificacion = false;
      this.filtros.tema = false;
      this.filtros.motivo = false;
      this.filtros.tipoVerso = false;
      this.filtros.tipoAccion = false;
      this.filtros.soporte = false;
      this.filtros.texto = false;
    }
  }
  public aceptar() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Aplica la selección del usuario, es decir, muestra los filtros seleccionados por el
    usuario.
    Las opciones de signos, vinculos y contexto no muestran opciones ya que muestran un mapa.
    ******************************************************************************************/
    if (this.tipo === 'signos') {
      this.datos.filtros.value = ['Signos Actorales'];
      return;
    }

    if (this.tipo === 'vinculos') {
      this.datos.filtros.value = ['Vinculos'];
      return;
    }

    if (this.tipo === 'contexto') {
      this.datos.filtros.value = ['Contexto'];
      return;
    }

    this.datos.filtros.value = [];
    if (this.filtros.autor) {          this.datos.filtros.value.push('Autor'); }
    if (this.filtros.obra) {           this.datos.filtros.value.push('Obra'); }
    if (this.filtros.clasificacion) {  this.datos.filtros.value.push('Clasificación'); }
    if (this.filtros.tema) {           this.datos.filtros.value.push('Tema'); }
    if (this.filtros.motivo) {         this.datos.filtros.value.push('Motivo'); }
    if (this.filtros.tipoVerso) {      this.datos.filtros.value.push('Tipo de Verso'); }
    if (this.filtros.tipoAccion) {     this.datos.filtros.value.push('Tipo de Acción'); }
    if (this.filtros.soporte) {        this.datos.filtros.value.push('Soporte'); }
    if (this.filtros.texto) {          this.datos.filtros.value.push('Textos o Palabras'); }

  }
  public cancelar() {

  }

  public moAyuda(seccion) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Muestra y oculta la descripción asociada al filtro.
    ******************************************************************************************/
    if (this.secVisible === seccion) {
      this.secVisible = '';
    } else {
      this.secVisible = seccion;
    }

  }

}
