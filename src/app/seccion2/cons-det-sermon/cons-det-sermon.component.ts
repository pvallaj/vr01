import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';

export interface IParametros {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-cons-det-sermon',
  styleUrls: ['./cons-det-sermon.component.css'],
  templateUrl: './cons-det-sermon.component.html',
})
export class ConsDetSermonComponent implements OnInit, OnChanges {
  /******************************************************************************************
  DESCRIPCIÓN:
  Consulta y muestra todos los datos de un sermon.
  ******************************************************************************************/
  @Input() public idSermon = 0;
  @Input() public tipo = 0;
  @Input() public textoBuscado = '';
  public sermon: any = null;
  public libro: any = null;
  public preliminares: any[] = null;
  public catalogos: any[] = null;
  public grabados: any[] = null;
  public repositorios: any[] = null;
  public estaCargando = false;
  public tabSeleccionado = 0;
  public terminoConsulta = '';

  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog,
    public cs: CanalService) {}

  public ngOnInit(): void {
    this.tabSeleccionado = 0;
    this.terminoConsulta = this.cs.terminoConsulta;
  }

  public ngOnChanges(changes) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Detecta los cambios en la sección del usuario y actualiza los datos i cambia el sermon seleccionado.
    PARAMETROS:
      changes. objeto que contiene la información del eveto de cambio. El dato de interés es el identificador del sermón.
    ******************************************************************************************/
    if (this.idSermon <= 0) {

      this.sermon = null;
      this.libro = [];
      this.preliminares = [];
      this.catalogos = [];
      this.grabados = [];
      this.repositorios = [];
      return;
    }

    this.estaCargando = true;

    this.cnx.sermones({id_sermon: this.idSermon}, 'consulta detalle sermon')
    .subscribe(
      (data) => {
        const idx = 1;
        const temp = data['resultado'];
        this.sermon = temp.sermon[0];
        this.libro = temp.libro[0];
        this.preliminares = temp.preliminares;
        this.catalogos = temp.catalogos;
        this.grabados = temp.grabados;
        this.repositorios = temp.repositorios;

        this.estaCargando = false;
        this.tabSeleccionado = 0;
        if (this.sermon.protesta_fe != null && this.sermon.protesta_fe.toLowerCase() === 'nada') { this.sermon.protesta_fe = null; }

      },
    (error) => {

        this.estaCargando = false;
      },
    );

  }

  public estaVacio(dato: string): boolean {
    /******************************************************************************************
    DESCRIPCIÓN:
      Cuando un campo contiene los caracteres "[" y "]" se considera un campo vacío, ya que el texto
      contenido entre estos caracteres es solo un comentario, del mismo modo, se considera un campos
      vacío cuando no contiene texto.
      Esto permite ocultar el campo cuando no contiene información
    PARAMETROS:
      dato. campo a evaluar.
    RESULTADO:
      true. si el campo cumple las condiciones de un campo vacio, false en otro caso.
    ******************************************************************************************/
    if (dato === null) { return true; }
    if (dato === '') { return true; }
    const datomin = dato.toLowerCase();
    if (datomin.indexOf('[') === 0 &&
        datomin.indexOf(']') >= 0) { return true; }
    return false;
  }

  public estaEncomillado(texto: string): boolean {
    /******************************************************************************************
    DESCRIPCIÓN:
      Permite verificar si el texto esta entrecomillado.
    PARAMETROS:
      texto. es el texto a verificar.
    RESULTADO:
      true si el texto esta entrecomillado, false en otro caso.
    ******************************************************************************************/
    if (texto.substr(0, 1) === '"' ) {
      return true;
    }
    return false;
  }

  public referencia(campo: string): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Recorta el texto proporcionado, hasta el primer espacio encontrado.
    PARAMETROS:
      campo. es el texto a recortar.
    RESULTADO:
      el texto recortado hasta el primer espacio o todo el texto en caso de que no tenga espacios.
    ******************************************************************************************/
    const idx = campo.indexOf(' ');
    if (idx === -1) {
      return campo;
    }
    return campo.substr(0, idx);
  }
}
