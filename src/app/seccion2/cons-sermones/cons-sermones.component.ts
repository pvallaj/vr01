import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { ConexionService } from '../../servicios/Conexion.service';
import { BusqAvanzadaSComponent } from '../busq-avanzada-s/busq-avanzada-s.component';
import { ConsDetSermonComponent } from '../cons-det-sermon/cons-det-sermon.component';

@Component({
  selector: 'app-cons-sermones',
  styleUrls: ['./cons-sermones.component.css'],
  templateUrl: './cons-sermones.component.html',
})
export class ConsSermonesComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Tomas los parametros determinados por el usuario y hace la solciitud de los registros coincidentes
  en la base de datos de sermones.
  ******************************************************************************************/
  public listaResultado: any[] = null;
  public totalRegistros = 0;
  // autocomplete autores
  public acAutores = new FormControl();
  public listaAutores: string[] = [];
  public listaAutoresOriginal: any[] = [];
  public listaFiltrada: Observable<string[]>;

 // autocompletar preliminares
 public acPreliminares = new FormControl();
 public listaPreliminares: string[] = [];
 public listaPreliminaresOriginal: any[] = [];
 public listaPreliminaresFiltrada: Observable<string[]>;

 // autocompletar preliminares
 public acDedicatarios = new FormControl();
 public listaDedicatarios: string[] = [];
 public listaDedicatariosOriginal: any[] = [];
 public listaDedicatariosFiltrada: Observable<string[]>;

  // ------------------------------
  public impresores = new FormControl();
  public listaImpresores: [];

  public listaCiudades: [];
  public listaObras: [];
  public listaOrdenesReligiosas: [];
  // ------------------------------
  public despResultado = 'block';
  public despDetalle = 'none';

  public frm: FormGroup;
  public vTitulo = '';
  public vThema = '';
  public vGrabado = '';

  // paginación
  public pidx = 0; // Número de página.
  public ptam = 10; // tamaño de la pagina

  // seleccionar elemento
  public idxSeleccionado = 0;
  public idSermonSel = 0;

  // Cargando datos.
  public estaCargando = false;

  // Mostrar/Ocultar detalle
  public desplegarDetalle = false;

  // ----------------------------
  public filtrosActivos = new FormControl();
  public listaFiltros: any[] = [
                                    { filtro : 'Autor'      },
                                    { filtro : 'Titulo'     },
                                    { filtro : 'Thema'      },
                                    { filtro : 'Año'        },
                                    { filtro : 'Rango de años'},
                                    { filtro : 'Impresor'},
                                    { filtro : 'Preliminares'},
                                    { filtro : 'Dedicatarios'},
                                    { filtro : 'Ciudad'},
                                    { filtro : 'Obra'},
                                    { filtro : 'Orden'},
                                    { filtro : 'Grabado'}];

  public textConsulta: string;

  constructor(
     private cnx: ConexionService,
     public dialog: MatDialog,
     private fb: FormBuilder) {

      this.filtrosActivos.setValue(['Autor', 'Titulo', 'Año']);
  }

  public ngOnInit(): void {
    this.crearForma();
    // autocomplete autor
    this.listaFiltrada = this.acAutores.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value)),
      );
    this.listaPreliminaresFiltrada = this.acPreliminares.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filterPreliminar(value)),
      );

    this.listaDedicatariosFiltrada = this.acDedicatarios.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filterDedicatarios(value)),
      );

    this.cnx.sermones(null, 'consulta catalogos base').subscribe(
      (datos) => {
        this.listaAutoresOriginal = datos['resultado'].autores;
        this.listaAutoresOriginal.forEach((autor) => {
          this.listaAutores.push(autor.autor);
        });

        this.listaPreliminaresOriginal = datos['resultado'].preliminares;
        this.listaPreliminaresOriginal.forEach((preliminar) => {
          this.listaPreliminares.push(preliminar.autor);
        });

        this.listaDedicatariosOriginal = datos['resultado'].dedicatarios;
        this.listaDedicatariosOriginal.forEach((dedicatario) => {
          this.listaDedicatarios.push(dedicatario.autor);
        });

        this.listaImpresores = datos['resultado'].impresores;
        this.listaCiudades = datos['resultado'].ciudad;
        this.listaObras = datos['resultado'].obra;
        this.listaOrdenesReligiosas = datos['resultado'].orden;

    },
    (error) => {
      console.log(error);
    });

  }

  public consulta_inicial() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Realiza una consulta directa de todos los registros existentes en la base de datos de sermones

    ******************************************************************************************/
    this.estaCargando = true;

    const p = {
      anio:         0,
      anio_fin:     1700,
      anio_ini:     1612,
      autor:        '',
      ciudad:       '',
      dedicatario:  '',
      grabado:      '',
      id_autor: -1,
      id_dedicatario: -1,
      id_preliminar: -1,
      impresor:     '',
      orden:        '',
      preliminar:   '',
      thema:        '',
      titulo:       '',
      tituloObra:   '',

      desde:  this.pidx * this.ptam,
      pagtam: this.ptam,
    };

    let temp: any[] = [];

    this.cnx.sermones(p, 'consulta sermones')
    .subscribe(
      (data) => {
        let idx = 1;
        temp = data['resultado'].registros;
        this.totalRegistros = data['resultado'].conteo[0].total;
        temp.forEach((el) => {
          el.muestra = el.autor_apellido + ', ' +
                    el.autor_nombre + ' y ' +
                    (el.autor_particula ? ' ' : el.autor_particula) +
                    ' ' + el.titulo + ', ' + el.ciudad + ', ' + el.anio + '.';
          idx++;
        });
        this.listaResultado = temp;

        this.idSermonSel = 0;
        this.idxSeleccionado = -1;
        this.estaCargando = false;
      },
    (error) => {
        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public consulta() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Toma los parametros definidos por el usuario y realiza la solicitud de los registros que
    cumplen con los criterios establecidos.
    ******************************************************************************************/
    this.estaCargando = true;

    const p = {
      autor:        this.filtroActivo('Autor') ? this.acAutores.value : '',
      id_autor: -1,

      anio:         this.filtroActivo('Año') ? this.frm.value.anio : 0,
      anio_fin:     this.filtroActivo('Rango de años') ? this.frm.value.anio_fin : 1700,
      anio_ini:     this.filtroActivo('Rango de años') ? this.frm.value.anio_ini : 1612,
      impresor:     this.filtroActivo('Impresor') ? this.frm.value.impresor : '',
      titulo:       this.filtroActivo('Titulo') ? this.frm.value.titulo : '',

      id_preliminar: -1,
      preliminar:   this.filtroActivo('Preliminares') ? this.acPreliminares.value : '',

      dedicatario:  this.filtroActivo('Dedicatarios') ? this.acDedicatarios.value : '',
      id_dedicatario: -1,

      ciudad:       this.filtroActivo('Ciudad') ? this.frm.value.ciudad : '',
      grabado:      this.filtroActivo('Grabado') ? this.frm.value.grabado : '',
      orden:        this.filtroActivo('Orden') ? this.frm.value.orden : '',
      thema:        this.filtroActivo('Thema') ? this.frm.value.thema : '',
      tituloObra:   this.filtroActivo('Obra') ? this.frm.value.tituloObra : '',

      desde:  this.pidx * this.ptam,
      pagtam: this.ptam,
    };

    let temp: any[] = [];
    if (this.filtroActivo('Autor')) {
      const encontrado = this.listaAutoresOriginal.find((el) => el.autor === this.acAutores.value);
      if (encontrado) {
        p.id_autor = encontrado.id_autor;
      }
    }

    if (this.filtroActivo('Preliminares')) {
      const preliminarEncontrado = this.listaPreliminaresOriginal.find((el) => el.autor === this.acPreliminares.value);
      if (preliminarEncontrado) {
        p.id_preliminar = preliminarEncontrado.id_autor;
      }
    }

    this.cnx.sermones(p, 'consulta sermones')
    .subscribe(
      (data) => {
        let idx = 1;
        temp = data['resultado'].registros;
        this.totalRegistros = data['resultado'].conteo[0].total;
        temp.forEach((el) => {
          el.muestra = el.autor_apellido + ', ' +
                    el.autor_nombre + ' y ' +
                    (el.autor_particula ? ' ' : el.autor_particula) +
                    ' ' + el.titulo + ', ' + el.ciudad + ', ' + el.anio + '.';
          idx++;
        });
        this.listaResultado = temp;

        this.idSermonSel = 0;
        this.idxSeleccionado = -1;
        this.estaCargando = false;
      },
    (error) => {

        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public cambiar(ids) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Marca el sermón con el id que viene como parametro, como el sermón seleccionado.
      Esta acción hace que se despliegue la sección de detalle del sermón
    PARAMETROS:
      ids. es el identificador del sermón seleccionado por el usuario.
    ******************************************************************************************/
    this.idSermonSel = ids;
    this.desplegarDetalle = !this.desplegarDetalle;

  }

  public cerrarDetalle() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Quita el id del sermón seleccionado, lo que provoca que la ventana de detalle se cierre
    y se muestre la lista de sermones disponibles de la consulta.
    ******************************************************************************************/
    this.idSermonSel = 0;
  }

  private _filter(value: string): string[] {
    /******************************************************************************************
    DESCRIPCIÓN:
      Realiza el filtrado de los autores que coinciden con el texto que el usuario esta tecleando.
      es decir, porpociona la funcionalidad de la lista auto completar de autoeres.
    PARAMETROS:
      values. es el texto tecleado por el usuario.
    ******************************************************************************************/
    const filterValue = value.toLowerCase();
    return this.listaAutores.filter((option) => option.toLowerCase().includes(filterValue));
  }

  private _filterPreliminar(value: string): string[] {
    /******************************************************************************************
    DESCRIPCIÓN:
      Realiza el filtrado de los preliminares que coinciden con el texto que el usuario esta tecleando.
      es decir, porpociona la funcionalidad de la lista auto completar de preliminares.
    PARAMETROS:
      values. es el texto tecleado por el usuario.
    ******************************************************************************************/
    const filterValue = value.toLowerCase();
    return this.listaPreliminares.filter((option) => option.toLowerCase().includes(filterValue));
  }

  private _filterDedicatarios(value: string): string[] {
    /******************************************************************************************
    DESCRIPCIÓN:
      Realiza el filtrado de los dedicatarios que coinciden con el texto que el usuario esta tecleando.
      es decir, porpociona la funcionalidad de la lista auto completar de dedicatarios.
    PARAMETROS:
      values. es el texto tecleado por el usuario.
    ******************************************************************************************/
    const filterValue = value.toLowerCase();
    return this.listaDedicatarios.filter((option) => option.toLowerCase().includes(filterValue));
  }

  public crearForma() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Genera la forma que contendra los datos usados como filtros para la consulta
    de la base de datos de sermones.
    ******************************************************************************************/
    this.frm = this.fb.group({
      // valor inicial, validaciones sincronas, validaciones asincronas
      anio:         ['', [ Validators.min(1612), Validators.max(1699)]],
      anio_fin:     ['1700', [ Validators.min(1613), Validators.max(1700)]],
      anio_ini:     ['1612', [ Validators.min(1612), Validators.max(1699)]],
      autor:        ['', [ Validators.maxLength(300)]],
      ciudad:       ['' ],
      dedicatarios: ['' ],
      grabado:      ['' , [ Validators.maxLength(30)]],
      impresor:     ['' ],
      orden:        ['' ],
      preliminares: ['' ],
      thema:        ['' ],
      titulo:       ['', [ Validators.maxLength(300)]],
      tituloObra:   ['' ],
    });

    this.frm.valueChanges.subscribe((v) => {
      /******************************************************************************************
      Detecta cuando la forma de datos de filtro cambia y limpa la lista de resultados.
      ******************************************************************************************/
      this.listaResultado = null;
    });

    this.filtrosActivos.valueChanges.subscribe((v) => {
      if (this.filtroActivo('Signos Actorales')) {
        this.filtrosActivos.setValue(['Signos Actorales'], {emitEvent: false});
      }
      this.listaResultado = null;
    });
  }

  public filtroActivo(f: string): boolean {
    /******************************************************************************************
    DESCRIPCIÓN:
    Determina si el filtro especificado se encuentra activo.
    PARAMETROS
    f. es el nombre del filtro que se desea evaluar.
    RESULTADO
      true si el filtro está activo y false en otro caso.
    ******************************************************************************************/
    if (this.filtrosActivos.value.indexOf(f) === -1) { return false; }
    return true;
  }

  public cambioAutor() {
    /******************************************************************************************
    DESCRIPCIÓN:
    se dispara cuando cambia el autor seleccioado para limpiar la lista de resultados.
    ******************************************************************************************/
    this.listaResultado = null;
  }
  public cambioAutorPreliminar() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Se dispara cuando cambia el autor de preliminar para limpiar la lista de resultados.
    ******************************************************************************************/
    this.listaResultado = null;
  }

  public cambioFiltros(e) {

  }

  public recortaSermon(sermon: string) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Recorta el sermón a un tamaño máximo de 250 caracteres.
    PARAMETROS:
      sermon. es el sermon a recorcar.
    RESULTADO:
      Es el sermón recortado a un tamaño de 250 caracteres.
    ******************************************************************************************/
    if (sermon.length > 250) {
      return sermon.substring(0, (sermon.indexOf(' ', 250)) > 0 ? (sermon.indexOf(' ', 250)) : sermon.length) + '...';
    }
    return sermon;
  }

  public abrirBusquedaAvanzada() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Abre la ventana de busqueda avanzada, para que el usuario pueda seleccionar un o más de los
    filtros disponibles.
    ******************************************************************************************/
    const dialogRef = this.dialog.open(BusqAvanzadaSComponent, {
      data: {filtros: this.filtrosActivos},
    });

  }
}
