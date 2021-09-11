import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MnsjDetalleComponent } from '../../seccion1/mnsj-detalle/mnsj-detalle.component';
import { ConexionService } from '../../servicios/Conexion.service';
import { ConsDetSermonComponent } from '../cons-det-sermon/cons-det-sermon.component';
import { BusqAvanzadaSComponent } from '../busq-avanzada-s/busq-avanzada-s.component';

@Component({
  selector: 'app-cons-sermones',
  templateUrl: './cons-sermones.component.html',
  styleUrls: ['./cons-sermones.component.css'],
})
export class ConsSermonesComponent implements OnInit {
  public listaResultado: any[] = null;
  public totalRegistros:number=0;
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
  public vTitulo:string='';
  public vThema:string='';
  public vGrabado:string='';

  // paginación
  public pidx = 0; // Número de página.
  public ptam = 10; // tamaño de la pagina

  // seleccionar elemento
  public idxSeleccionado = 0;
  public idSermonSel = 0;
  
  // Cargando datos.
  public estaCargando = false;

  //Mostrar/Ocultar detalle
  public desplegarDetalle=false;

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
                                    { filtro : 'Grabado'},];

  // @ViewChild("detsermon") detSermon: ConsDetSermonComponent;

  constructor(
     private cnx: ConexionService,
     public dialog: MatDialog,
     private fb: FormBuilder) {

      this.filtrosActivos.setValue(['Autor', 'Titulo', 'Año']);
     }
  public textConsulta: string;
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

    //this.consulta_inicial();
  }
  public consulta_inicial() {
    this.estaCargando = true;
        
    const p = {
      autor:        '',
      id_autor: -1,
      titulo:       '',
      anio:         0,
      anio_ini:     1612,
      anio_fin:     1700,
      impresor:     '',

      preliminar:   '',
      id_preliminar: -1,

      dedicatario:  '',
      id_dedicatario: -1,

      ciudad:       '',
      tituloObra:   '',
      orden:        '',
      thema:        '',
      grabado:      '',

      desde:  this.pidx * this.ptam,
      pagtam: this.ptam,
    };

    let temp: any[] = [];
    
    this.cnx.sermones(p, 'consulta sermones')
    .subscribe(
      (data) => {
        let idx = 1;
        temp = data['resultado'].registros;
        this.totalRegistros=data['resultado'].conteo[0].total;
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
    this.estaCargando = true;

    
    const p = {
      autor:        this.filtroActivo('Autor')? this.acAutores.value:'',
      id_autor: -1,

      titulo:       this.filtroActivo('Titulo')?this.frm.value.titulo:'',
      anio:         this.filtroActivo('Año')?this.frm.value.anio:0,
      anio_ini:     this.filtroActivo('Rango de años')?this.frm.value.anio_ini:1612,
      anio_fin:     this.filtroActivo('Rango de años')?this.frm.value.anio_fin:1700,
      impresor:     this.filtroActivo('Impresor')?this.frm.value.impresor:'',

      preliminar:   this.filtroActivo('Preliminares')?this.acPreliminares.value:'',
      id_preliminar: -1,

      dedicatario:  this.filtroActivo('Dedicatarios')?this.acDedicatarios.value:'',
      id_dedicatario: -1,

      ciudad:       this.filtroActivo('Ciudad')?this.frm.value.ciudad:'',
      tituloObra:   this.filtroActivo('Obra')?this.frm.value.tituloObra:'',
      orden:        this.filtroActivo('Orden')?this.frm.value.orden:'', 
      thema:        this.filtroActivo('Thema')?this.frm.value.thema:'',
      grabado:      this.filtroActivo('Grabado')?this.frm.value.grabado:'',

      desde:  this.pidx * this.ptam,
      pagtam: this.ptam,
    };

    let temp: any[] = [];
    if(this.filtroActivo('Autor')){
      const encontrado = this.listaAutoresOriginal.find((el) => el.autor === this.acAutores.value);
      if (encontrado) {
        p.id_autor = encontrado.id_autor;
      }
    }

    if(this.filtroActivo('Preliminares')){
      const preliminarEncontrado = this.listaPreliminaresOriginal.find((el) => el.autor === this.acPreliminares.value);
      if (preliminarEncontrado) {
        p.id_preliminar = preliminarEncontrado.id_autor;
      }
    }

    /*if(this.filtroActivo('Dedicatarios')){
      const dedicatarioEncontrado = this.listaDedicatariosOriginal.find((el) => el.autor === this.acDedicatarios.value);
      if (dedicatarioEncontrado) {
        p.id_dedicatario = dedicatarioEncontrado.id_dedicatario;
      }
    }*/
    
    this.cnx.sermones(p, 'consulta sermones')
    .subscribe(
      (data) => {
        let idx = 1;
        temp = data['resultado'].registros;
        this.totalRegistros=data['resultado'].conteo[0].total;
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

  public detalle() {
    const dialogRef = this.dialog.open(ConsDetSermonComponent, {
      width: '98%',
      data: {nombre: 'Hola', descripcion: 'Amigo'},
    });
  }

  public cambiar(ids) {
    this.idSermonSel = ids;
    this.desplegarDetalle=!this.desplegarDetalle;
    
  }
  cerrarDetalle(){
    this.idSermonSel = 0;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaAutores.filter((option) => option.toLowerCase().includes(filterValue));
  }
  private _filterPreliminar(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaPreliminares.filter((option) => option.toLowerCase().includes(filterValue));
  }
  private _filterDedicatarios(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaDedicatarios.filter((option) => option.toLowerCase().includes(filterValue));
  }

  public crearForma() {
    this.frm = this.fb.group({
      // valor inicial, validaciones sincronas, validaciones asincronas
      autor:        ['', [ Validators.maxLength(300)]],
      titulo:       ['', [ Validators.maxLength(300)]],
      anio:         ['', [ Validators.min(1612), Validators.max(1699)]],
      anio_ini:     ['1612', [ Validators.min(1612), Validators.max(1699)]],
      anio_fin:     ['1700', [ Validators.min(1613), Validators.max(1700)]],
      impresor:     ['' ],
      preliminares: ['' ],
      dedicatarios: ['' ],
      ciudad:       ['' ],
      tituloObra:   ['' ],
      orden:        ['' ],
      thema:        ['' ],
      grabado:      ['' , [ Validators.maxLength(30)]],
    });
    this.frm.valueChanges.subscribe((v)=>{

      this.listaResultado=null;
    });
    
    this.filtrosActivos.valueChanges.subscribe((v)=>{

      if(this.filtroActivo('Signos Actorales')){
        
        this.filtrosActivos.setValue(['Signos Actorales'],{emitEvent:false})        
      }
      this.listaResultado=null;
    });
  }

  public filtroActivo(f:string):boolean{
    if(this.filtrosActivos.value.indexOf(f)==-1) return false;
    return true;
  }

  public cambioAutor() {
    this.listaResultado = null;
  }
  public cambioAutorPreliminar() {
    this.listaResultado = null;
  }

  public cambioFiltros(e) {


  }
  public recortaSermon(sermon: string) {
    if (sermon.length > 250) {
      return sermon.substring(0, (sermon.indexOf(' ', 250))>0?(sermon.indexOf(' ', 250)):sermon.length) + '...';
    }
    return sermon;
  }
  public abrirBusquedaAvanzada(){
    const dialogRef = this.dialog.open(BusqAvanzadaSComponent, {
      data: {filtros:this.filtrosActivos}
    });
    
  }
}

