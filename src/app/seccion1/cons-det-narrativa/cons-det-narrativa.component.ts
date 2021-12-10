import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';

export interface IParametros {
  nombre: string;
  descripcion: string;
}

export interface INarrativa {
  autor: string;
  narratio: string;
  id_texto: number;
  obra: string;
  nombre: string;
  ubicacion: string;
}
@Component({
  selector: 'app-cons-det-narrativa',
  styleUrls: ['./cons-det-narrativa.component.css'],
  templateUrl: './cons-det-narrativa.component.html',
})
export class ConsDetNarrativaComponent implements OnInit, OnChanges {
  /******************************************************************************************
  DESCRIPCIÓN:
  Consulta y muestra el detalle de la narrativa especificada.

  PARAMETROS.
  idTexto. es el identificador de la "relación".
  narrativa. es la narrativa seleccionada. contiene los datos basicos de una relación.
  textoBuscado. Cuando esta ventana se abre como resultado de una busqueda hecha por el
  usuario fuera de la herramienta de relaciones.
  ******************************************************************************************/
  @Input() public idTexto = 0;
  @Input() public narrativa: INarrativa = null;
  @Input() public textoBuscado = '';

  public bibliografia: any = null;
  public princeps: any = null;
  public contexto: any = null;
  public tipoAccion: any = null;
  public clasificacion: any = null;
  public motivos: any = null;
  public tema: any = null;
  public versificacion: any = null;
  public soporte: any = null;
  public signos: any = null;
  public vinculos: any = null;

  public estaCargando = false;
  public tabSeleccionado = 0;

  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog,
    public cs: CanalService ) {}

  public ngOnInit(): void {
    this.tabSeleccionado = 0;
    if (!this.textoBuscado) {
      this.textoBuscado = this.cs.terminoConsulta;
    }

  }

  public ngOnChanges(changes) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Realiza la consulta de los detalles de la relación seleccionada.
    Se dispara cada vez que algun dato de este componente tiene un cambio,
    en este caso el valor que es de interes es el idTexto, cuando este valor
    cambia significa que el usuario ha seleccionado otra "relación" y se debe
    realizar otra consulta de detalles.
    ******************************************************************************************/
    if (this.idTexto === 0 ) {

      this.bibliografia = [];
      return;
    }

    // consultando detalle del sermon
    this.estaCargando = true;
    this.cnx.narrativas({id_texto: this.idTexto}, 'consulta detalle narrativa')
    .subscribe(
      (data) => {
        const temp = data['resultado'];

        this.bibliografia =   temp.bibliograficos[0] || null;
        this.princeps =       temp.princeps[0] || null;
        this.contexto =       temp.contexto[0] || null;
        this.tipoAccion =     temp.tipoAccion || null;
        this.clasificacion =  temp.clasificacion || null;
        this.motivos =        temp.motivos || null;
        this.tema =           temp.temas || null;
        this.versificacion =  temp.versificacion || null;
        this.soporte =        temp.soporte || null;
        this.signos =         temp.signos[0] || null;
        this.vinculos =       temp.vinculos[0] || null;

        this.tabSeleccionado = 0;
        this.estaCargando = false;
        if (this.tipoAccion.length === 0) {
          this.tipoAccion = null;
        }
        if (this.motivos.length === 0) {
          this.motivos = null;
        }
        if (this.tema.length === 0) {
          this.tema = null;
        }
        if (this.versificacion.length === 0) {
          this.versificacion = null;
        }
        if (this.soporte.length === 0) {
          this.soporte = null;
        }

      },
    (error) => {

        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public crearTextoBiliografia(elmt: any) {
    /******************************************************************************************
    DESCRIPCIÓN
    Crea un texto estructurado con la información de la relación.

    PARAMETROS
    Elmt. Objeto que contiene los datos de la relación y con la cual se armará el texto estructurado.
    ******************************************************************************************/
    // , {{}}, {{elmt.}}, {{elmt.editor}}, {{elmt.editor}}, {{elmt.anio}} , {{elmt.obra_anfitrio}}

    let res = elmt.autor + ', <i> ' + elmt.obra + '</i>';
    if (elmt.ed_paleo) {
      res = res + ', ed. ' + elmt.ed_paleo;
    }
    if (elmt.director_cor) {
      res = res + ', coord. ' + elmt.ed_paleo;
    }
    if (elmt.traductor) {
      res = res + ', trad. ' + elmt.ed_paleo;
    }
    if (elmt.editor) {
      res = res + ', ed. ' + elmt.editor;
    }
    if (elmt.ciudad) {
      res = res + ', ' + elmt.ciudad;
    }
    if (elmt.anio) {
      res = res + ', ' + elmt.anio;
    }
    if (elmt.obra_anfitrion) {
      res = res + ', en ' + elmt.obra_anfitrion;
    }
    if (elmt.tomo) {
      res = res + ', t. ' + elmt.obra_anfitrion;
    }
    if (elmt.coleccion) {
      res = res + ', col. ' + elmt.coleccion;
    }
    if (elmt.pp) {
      res = res + ', pp. ' + elmt.pp;
    }
    return res;
  }
  public resalta(texto: string, args: string) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Agrega una marca al texto para resaltarlo del resto del texto.

    PARAMETROS
    texto. Texto donde se encuentra la palabra o frase a resaltar.
    args. Palabra a resaltar.
    ******************************************************************************************/
    if (!args || args === '' || !texto || texto === '') { return texto; }

    if (args.indexOf('+') > 0) {
      const textos = args.split('+');
      textos.forEach((el) => {
        const re = new RegExp(el, 'gi');
        texto = texto.replace(re, '<mark class="resaltado">$&</mark>');
      });
      return texto;
    } else {
      const re = new RegExp(args, 'gi');
      return texto.replace(re, '<mark class="resaltado">$&</mark>');
    }

  }
}
