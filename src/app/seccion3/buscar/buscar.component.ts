import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-buscar',
  styleUrls: ['./buscar.component.css'],
  templateUrl: './buscar.component.html',
})
export class BuscarComponent implements OnInit, OnDestroy {
  /******************************************************************************************
  DESCRIPCIÓN:
    Muestra el resultado de la consulta hecha por el usuario, desde el buscador en el encabezado
    de la página.
  ******************************************************************************************/
  private escucha: Subscription;

  public estaCargando = false;
  public idxSeleccionado: -1;
  public resultadoOE: string[] = [];
  public resultadoNarrativas: string[] = [];
  public resultadoSermones: string[] = [];
  public referencia: string = null;
  public tipoReferencia: string = null;
  public elementoSeleccionado: any;

  public termino: string;
  constructor(private cs: CanalService, private cnx: ConexionService, private r: Router) {
    this.escucha = this.cs.getMessage().subscribe((m) => {
      if (m) {
        this.buscarTermino(m);
      }
    });
   }

  public ngOnInit(): void {
    /******************************************************************************************
    DESCRIPCIÓN:
    Siempre que se invoque este componente se realizará la consulta con el texto que el usuario
    haya escrito en el buscador.
    ******************************************************************************************/
    this.buscarTermino({text: this.cs.terminoConsulta});
  }

  private buscarTermino(terminos: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Realiza la invocación al proceso de consulta del "termino" a la base de datos.
    PARAMETROS:
      terminos. Puede ser un texto simple o un objeto con un elemento text.
    RESULTADO:
      El resultado es una estructura de tres secciones, un para los resultados encontrados
      en los sermones, otra para los resultados encontrados en las relaciones y finalmente
      otra para los resultados entrados en la obra escrita.
    ******************************************************************************************/
    if (!terminos || !terminos?.text) {
      this.r.navigate(['/inicio']);
      return;
    }
    this.estaCargando = true;
    this.termino = terminos.text;
    this.cnx.novohisp({terminos: terminos.text}, 'buscar terminos')
    .subscribe(
      (data) => {
        this.resultadoOE = data['resultado'].obraescrita;
        this.resultadoNarrativas = data['resultado'].narrativas;
        this.resultadoSermones = data['resultado'].sermones;
        if (this.resultadoNarrativas) {
          this.resultadoNarrativas.forEach((lmnt: any) => {
            lmnt.narratioRecortado = this.recorta(this.termino, lmnt.narratio, 200);
          });
        } else {
          this.resultadoNarrativas = null;
        }
        if (this.resultadoSermones) {
          this.resultadoSermones.forEach((lmnt: any) => {
            lmnt.sermonRecortado = this.recorta(this.termino, lmnt.titulo, 200);
          });
        } else {
          this.resultadoSermones = null;
        }

        this.estaCargando = false;
      },
    (error) => {

        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public recorta(termino: string, texto: string, tm: number): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Realiza un recorte del "texto" al tamaño tm, dentro del recorte el termino debe aparecer.
    PARAMETROS:
      termino. Es el termino que debe aparecer en el recorte.
      tm. Es el tamano, en numero de caracteres, del recorte.
      texto. Es el texto a recortar.
    RESULTADO:
      Un texto de tamaño "tm" o menor, que contenga el "termino"
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

  public verDetalle(e: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Muestra una ventana con el detalle del elemento seleccionado. Esto implica abrir una venta que
      muestra todos los datos del sermon seleccionado, o la relacion seleccionada o el elemento de
      obra escrita seleccionada.
    PARAMETROS:
      e. Elemento seleccionado.
    RESULTADO:
      Ninguno.
    ******************************************************************************************/
    if (e.id_sermon) {

      this.tipoReferencia = 'sermon';
      this.referencia = e.id_sermon;
      return;
    }
    if (e.id_texto) {

      this.tipoReferencia = 'relacion';
      this.referencia = e.id_texto;
      return;
    }

    if (e.tipo) {
      this.tipoReferencia = 'buscar';
      this.referencia = 'varios';
      this.elementoSeleccionado = e;
      return;
    }
  }

  public cerrarDetalle() {
    /******************************************************************************************
    DESCRIPCIÓN:
    Cierra la venta que muestra el detalle del elemento seleccionado.
    ******************************************************************************************/
    this.tipoReferencia = null;
    this.referencia = null;
  }
  public ngOnDestroy(): void {
    this.escucha.unsubscribe();
  }

}
