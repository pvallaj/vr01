import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-detalle-oe',
  styleUrls: ['./detalle-oe.component.css'],
  templateUrl: './detalle-oe.component.html',
})
export class DetalleOEComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Abre una ventana que muestra los detalles de un elemento seleccionado, el elemento puede ser
  una imagen, una liga a un sitio web, un archivo PDF, o un video.
  ******************************************************************************************/
  @Input() public elemento: any;
  @Input() public tipo = 1; // 1.- Detalle completo, 2.- Detalle resumido
  @Output() public seleccionarCapitulo = new EventEmitter<number>();

  public termino: string;
  public estaCargando = false;
  public referencias = null;
  public mostrarTexto = true;

  constructor(private cs: CanalService, private cnx: ConexionService) {
    if (cs.terminoConsulta) {
      this.termino = cs.terminoConsulta;
    }

  }

  public ngOnInit(): void {
    if (this.tipo === 2) {
      // se obtienen las referencias de capitulos a los que pertenece el recurso.
      this.estaCargando = true;
      this.cnx.novohisp({id: this.elemento.id}, 'referencias recurso').subscribe(
        (datos) => {
          this.estaCargando = false;
          this.referencias = datos['resultado'];
      }, (error) => {

        console.log(error);
      });
    }

  }

  public recorta(termino: string, texto: string, largo: number): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Recorta un texto al tamaño especifido y asegurando que en el recorte se encuentra el termino.
    PARAMETROS:
      termino. es el texto que debe estar incluido en el recorte.
      tm. es el tamaño del recorte.
      texto. Es el texto a recortar.
    RESULTADO:
      un texto de tamaño maximo "tm" y que contiene el termino.
    ******************************************************************************************/
    if (texto.indexOf(termino) >= 0 && texto.indexOf(termino) > largo) {
      const pt = texto.indexOf(termino);
      const inicio = pt - largo / 2 + (texto.indexOf(' ', pt - largo / 2) - (pt - largo / 2));
      const fin = texto.indexOf(' ', inicio + largo);
      if (fin === -1) {
        return '...' + texto.substring(inicio);
      }
      return '...' + texto.substring(inicio, fin) + '...';
    } else {
      if (texto.length > largo) {
        return texto.substring(0, texto.indexOf(' ', largo)) + '...';
      }

    }
    return texto;
  }

  public ocultarTexto() {
    this.mostrarTexto = !this.mostrarTexto;
  }

  public seleccionar(idc: number) {
    this.seleccionarCapitulo.emit(idc);
  }

}
