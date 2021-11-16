import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ConexionService } from '../../servicios/Conexion.service';

import { MatDialog } from '@angular/material/dialog';
import { BusqAvanzadaComponent } from '../busq-avanzada/busq-avanzada.component';

@Component({
  selector: 'app-consulta-narrativas',
  styleUrls: ['./consultaNarrativas.component.css'],
  templateUrl: './consultaNarrativas.component.html',
})
export class ConsultaNarrativasComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Obtiene los datos de los filtros seleccionados por el usuario y usa para solicitar
  los registros que coinciden con los mismo.
  ******************************************************************************************/
  @ViewChild('marcaNarrativas') public mNarrativa: any;

  public listaResultado: any[] = null;
  public listaResultadoSA: any[] = null;
  public listaResultadoV: any[] = null;
  public listaResultadoC: any[] = null;
  public totalRegistros = 0;
  // autocomplete
  public acAutores = new FormControl();
  public listaAutores: any[] = [];
  public listaAutoresObras: any[] = [];
  public listaObras: any[] = [];
  public listaClasificacion: any[] = [];
  public listaTemas: any[] = [];
  public listaMotivos: any[] = [];
  public listaVersificaciones: any[] = [];
  public listaTipoAcciones: any[] = [];
  public listaSoporte: any[] = [];
  public listaDistancias: number[] = [0, 10, 20, 50, 100, 200];

  public despResultado = 'block';
  public despDetalle = 'none';
  public desplegarDetalle = false;

  public frm: FormGroup;
  public vTextos = '';

  // paginación
  public pidx = 0; // Número de página.
  public ptam = 10; // tamaño de la pagina

  // seleccionar elemento
  public idxSeleccionado = 0;
  public narrativaSeleccionada = {};
  public idNarrativaSel = 0;

  // Cargando datos.
  public estaCargando = false;

  public textConsulta: string;

  public fcAutores = new FormControl();
  public fcObras = new FormControl();

  public filtrosActivos = new FormControl();
  public listaFiltros: any[] = [
    { filtro : 'Autor', descripcion: 'Descripción del filtro' },
    { filtro : 'Obra', descripcion: 'Descripción del filtro'},
    { filtro : 'Clasificación', descripcion: 'Descripción del filtro'},
    { filtro : 'Tema', descripcion: 'Descripción del filtro'},
    { filtro : 'Motivo', descripcion: 'Descripción del filtro'},
    { filtro : 'Tipo de Verso', descripcion: 'Descripción del filtro'},
    { filtro : 'Tipo de Acción', descripcion: 'Descripción del filtro'},
    { filtro : 'Soporte', descripcion: 'Descripción del filtro'},
    { filtro : 'Textos o Palabras', descripcion: 'Busqueda de palabras o textos en un espacio de N palabras'},
    { filtro : 'Signos Actorales', descripcion: 'Descripción del filtro'}];

  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog,
    private fb: FormBuilder) {
      this.filtrosActivos.setValue(['Autor', 'Obra', 'Textos o Palabras']);
    }

  public ngOnInit(): void {

    this.crearForma();

    this.cnx.narrativas(null, 'consulta catalogo base').subscribe(
      (datos) => {
        this.listaAutores = datos['resultado'].autores;
        this.listaAutoresObras = datos['resultado'].obras;
        this.listaClasificacion = datos['resultado'].clasificacion;
        this.listaTemas = datos['resultado'].tema;
        this.listaMotivos = datos['resultado'].motivos;
        this.listaVersificaciones = datos['resultado'].versificacion;
        this.listaTipoAcciones = datos['resultado'].tipoaccion;
        this.listaSoporte = datos['resultado'].soporte;
        this.listaObras = this.listaAutoresObras;
    },
    (error) => {

      console.log(error);
    });

  }

  public autorSeleccionado(sel) {

    if ( sel.value === undefined) {
      this.listaObras = this.listaAutoresObras;
    } else {
      this.listaObras = this.listaAutoresObras.filter((elm) => elm.autor === sel.value);
    }
  }

  public consulta() {
    /******************************************************************************************
    DESCRIPCIÓN:
    hace la solcitud de los registros coincidentes con los filtros aplicados por el usario.
    ******************************************************************************************/
    this.estaCargando = true;

    const p = {
      autor:          this.filtroActivo('Autor') ? this.frm.value.autor : '',
      clasificacion:  this.filtroActivo('Clasificación') ? this.frm.value.clasificacion : '',
      motivo:         this.filtroActivo('Motivo') ? this.frm.value.motivo : '',
      obra:           this.filtroActivo('Obra') ? this.frm.value.obra : '',
      soporte:        this.filtroActivo('Soporte') ? this.frm.value.soporte : '',
      tema:           this.filtroActivo('Tema') ? this.frm.value.tema : '',
      textos:         this.filtroActivo('Textos o Palabras') ? this.frm.value.textos : '',
      tipoAccion:     this.filtroActivo('Tipo de Accion') ? this.frm.value.tipoAccion : '',
      tipoVerso:      this.filtroActivo('Tipo de Verso') ? this.frm.value.tipoVerso : '',

      desde:          this.pidx * this.ptam,
      pagtam:         this.ptam,
    };
    if ( this.filtroActivo('Autor')  &&  !this.filtroActivo('Obra') ) {
      if (this.fcAutores.value?.length > 1) {
        const aa: string[] = this.fcAutores.value;
        const f: string[] = [];
        for (let i = 0; i < aa.length; i++) {
          f.push('\'' + aa[i] + '\'');
        }
        p.autor = f.join(',');
      } else {
        if (this.fcAutores.value) {
          p.autor = this.fcAutores.value[0];
        }
      }

    }

    if ( this.filtroActivo('Obra')  && !this.filtroActivo('Autor') ) {
      if (this.fcObras.value?.length > 1) {
        const aa: string[] = this.fcObras.value;
        const f: string[] = [];
        for (let i = 0; i < aa.length; i++) {
          f.push('\'' + aa[i] + '\'');
        }
        p.obra = f.join(',');
      } else {
        if (this.fcObras.value) {
          p.obra = this.fcObras.value[0];
        }
      }

    }
    const re = /\+/gi;
    p.textos = p.textos.replace(re, '$');

    let temp: any[] = [];
    this.idxSeleccionado = 0;

    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data) => {
        const idx = 1;
        temp = data['resultado'];
        this.listaResultado = data['resultado'].registros;
        this.totalRegistros = data['resultado'].conteo[0].total;
        if (this.frm.value.textos) {
          this.listaResultado = this.listaResultado.filter((lmnt) => this.filtraDistancia(lmnt.narratio));
        }
        this.listaResultado.forEach((lmnt) => {
          const termino = this.frm.value.textos;

          lmnt.narratioRecortado = this.recortaNarrativa(lmnt.narratio, termino, 300);
        });
        this.estaCargando = false;
      },
    (error) => {
        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public consulta_inicial() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Realiza una consulta para obtener todos los registros disponibles en la base de datos de relaciones.
    ******************************************************************************************/
    this.estaCargando = true;

    const p = {
      autor:          '',
      clasificacion:  '',
      motivo:         '',
      obra:           '',
      soporte:        '',
      tema:           '',
      textos:         '',
      tipoAccion:     '',
      tipoVerso:      '',

      desde:          this.pidx * this.ptam,
      pagtam:         this.ptam,
    };

    let temp: any[] = [];
    this.idxSeleccionado = 0;

    this.cnx.narrativas(p, 'consulta narrativas')
    .subscribe(
      (data) => {
        const idx = 1;
        temp = data['resultado'];
        this.listaResultado = data['resultado'].registros;
        this.totalRegistros = data['resultado'].conteo[0].total;
        if (this.frm.value.textos) {
          this.listaResultado = this.listaResultado.filter((lmnt) => this.filtraDistancia(lmnt.narratio));
        }
        this.listaResultado.forEach((lmnt) => {
          const termino = this.frm.value.textos;

          lmnt.narratioRecortado = this.recortaNarrativa(lmnt.narratio, termino, 300);
        });
        this.estaCargando = false;
      },
    (error) => {
        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  private filtraDistancia(texto: string): boolean {
    /******************************************************************************************
    DESCRIPCIÓN:
    Despue de obtener los registro que cumplen con los criterios seleccionados por el usaurio,
    se filtran nuevamente para dejar solo a los que cumplen con el criterio de "distnacia entre palabras".
    ******************************************************************************************/
    let r1 = true;
    let r2 = true;
    const palabras: string[] = this.frm.value.textos.split('+', 3);
    if (palabras.length > 1) {
      r1 = this.estanEnDistancia(texto, palabras[0], palabras[1], this.frm.value.distancia);
    }
    if (palabras.length === 3) {
      r2 = this.estanEnDistancia(texto, palabras[1], palabras[2], this.frm.value.distancia);
    }
    return r1 && r2;
  }

  private estanEnDistancia(texto: string= '', palabra1: string= '', palabra2: string= '', distancia: number): boolean {
    /******************************************************************************************
    DESCRIPCIÓN:
      Evalua si las palabras proporcionadas se encuentran en el texto y si la distnacia entre ambas es
      menor o igual a la distnacia, en palabras, especificada.
    PARAMETROS:
      texto. Es el texto donde se buscaran las palabras.
      palabra1 y palabra2. Son las palabras a buscar y evaluar en distnacia.
      distancia. Es el numero de palabras que definene la distnacia.
    RESULTADO:
    cierto. si existen las palabras y y estan a la distncia menor o igual a la especificada, falso otro caso.
    ******************************************************************************************/
    let up1 = 0;
    let up2 = 0;

    if (distancia === 0) { return true; }
    palabra1 = palabra1.toLowerCase();
    palabra2 = palabra2.toLowerCase();
    texto = texto.toLowerCase();

    up1 = texto.indexOf(palabra1, up1);
    while (up1 > 0 && up1 < texto.length) {
      up2 = texto.indexOf(palabra2, up2);
      while (up2 > 0 && up2 < texto.length) {
        let ss: string[];
        if (up1 < up2) {
          ss = texto.substr(up1 + palabra1.length, up2 - up1).split(' ');
        } else {
          ss = texto.substr(up2 + palabra2.length, up1 - up2).split(' ');
        }
        if (ss.length <= distancia) {
          return true;
        }
        up2 = texto.indexOf(palabra2, up2 + 1);
      }
      up1 = texto.indexOf(palabra1, up1 + 1);
    }
    return false;
  }

  public cambiar(seleccionado) {
    this.idNarrativaSel = seleccionado.id_texto;
    this.narrativaSeleccionada = seleccionado;
  }
  public cerrarDetalle() {
    this.idNarrativaSel = 0;
    this.narrativaSeleccionada = null;
  }

  public crearForma() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Crea la forma de la cual se obtiene los datos proporcionados por el usuario.
    ******************************************************************************************/
    this.frm = this.fb.group({
      // valor inicial, validaciones sincronas, validaciones asincronas
      autor: ['' ],
      clasificacion: [''],
      distancia: [0 ],
      motivo: ['' ],
      obra: ['' ],
      soporte: ['' ],
      tema: ['' ],
      textos: ['' ],
      tipoAccion: ['' ],
      tipoVerso: ['' ],
    });
    this.frm.valueChanges.subscribe((v) => {

      this.listaResultado = null;
      if (this.filtroActivo('Autor')) {
        this.listaObras = this.listaAutoresObras;
      }
    });
    this.fcAutores.valueChanges.subscribe((v) => {

      this.listaResultado = null;
    });
    this.fcObras.valueChanges.subscribe((v) => {

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
      determina si el filtro especificado está activo.
    PARAMETROS:
      f. es el nombre del filtro especificado
    RESULTADO:
      true. si el filtro está activo, false en otro caso.
    ******************************************************************************************/
    if (this.filtrosActivos.value.indexOf(f) === -1) { return false; }
    return true;
  }

  public abrirBusquedaAvanzada() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Abre la ventana que muestra las opciones de busqueda avanzada.
    ******************************************************************************************/
    this.listaResultadoSA = null;
    this.listaResultadoV = null;
    this.listaResultadoC = null;
    this.listaResultado = null;
    const dialogRef = this.dialog.open(BusqAvanzadaComponent, {
      data: {filtros: this.filtrosActivos},
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (this.filtroActivo('Signos Actorales')) {
        this.listaResultado = null;
        this.buscarSignosActorales();
        return;
      }
      if (this.filtroActivo('Vinculos')) {
        this.listaResultado = null;
        this.buscarVinculos();
        return;
      }

      if (this.filtroActivo('Contexto')) {
        this.listaResultado = null;
        this.buscarContexto();
        return;
      }

    });
  }

  private buscarSignosActorales() {
    /******************************************************************************************
    DESCRIPCIÓN:
    hace la consulta de los datos para crear el mapa de signos actorales.
    ******************************************************************************************/
    const p = null;
    this.estaCargando = true;
    this.cnx.narrativas(p, 'consulta signos actorales')
    .subscribe(
      (data) => {
        this.listaResultadoSA = data['resultado'];
        this.estaCargando = false;
      },
    (error) => {

        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  private buscarVinculos() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Hace la consulta para obtener los datos para crear el mapa de vinvulos.
    ******************************************************************************************/
    const p = null;
    this.estaCargando = true;
    this.cnx.narrativas(p, 'consulta vinculos')
    .subscribe(
      (data) => {
        this.listaResultadoV = data['resultado'];
        this.estaCargando = false;
      },
    (error) => {

        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  private buscarContexto() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Hace la consulta para obtener los datos para crear el mapa de contexto.
    ******************************************************************************************/
    const p = null;
    this.estaCargando = true;
    this.cnx.narrativas(p, 'consulta contexto')
    .subscribe(
      (data) => {
        this.listaResultadoC = data['resultado'];
        this.estaCargando = false;
      },
    (error) => {

        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public recortaNarrativa(texto: string, termino: string, tm: number): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Recorta el texto de la narrativa, al numero de caracteres definido, priorizando que el temino exista
      dentro del texto recortado.
    PARAMETROS:
      texto. es la narrativa a recortar.
      termino. es el texto que debe de existir dentro del recorte.
      tm. es el tamaño, en nuemro de caracteres, del recorte.
    RESULTADO:
      una cadena no más grande que es tamaño especificado e incluyen el termino especificado.
    ******************************************************************************************/
    const original = texto;
    texto = texto.toLowerCase();
    termino = termino.toLowerCase().replace(/["]+/g, '');

    if (texto.indexOf(termino) >= 0 && texto.indexOf(termino) > tm) {
      const pt = texto.indexOf(termino);
      const inicio = pt - tm / 2 + (texto.indexOf(' ', pt - tm / 2) - (pt - tm / 2));
      const fin = texto.indexOf(' ', inicio + tm);

      if (fin === -1) {
        return '...' + original.substring(inicio);
      }
      return '...' + original.substring(inicio, fin) + '...';
    } else {
      if (texto.length > tm) {
        return texto.substring(0, texto.indexOf(' ', tm)) + '...';
      }

    }
    return texto;
  }
}
