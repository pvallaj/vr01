import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Globales } from '../../generales/globales';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-noticias-sld',
  styleUrls: ['./noticias-sld.component.css'],
  templateUrl: './noticias-sld.component.html',
})
export class NoticiasSLDComponent implements OnInit, OnDestroy {
  /******************************************************************************************
  DESCRIPCIÓN:
  Crea un carrusel con las noticias existentes.
  ******************************************************************************************/
  public imgSel = '';
  public listaNoticias: any[] = null;
  public estaCargando = false;
  public noticiaActiva = null;
  public elemento = null;
  public ruta: string = null;
  private intervalo;

  constructor(private cnx: ConexionService) {
    this.ruta = Globales.rutaImgNoticias;
  }

  public ngOnInit(): void {
    this.estaCargando = true;
    this.cnx.noticias(null, 'obtener todas las noticias activas').subscribe(
      (datos) => {
        this.listaNoticias = datos['resultado'];
        if (this.listaNoticias.length === 0) {
          this.listaNoticias = null;
          return;
        }
        this.estaCargando = false;
        this.noticiaActiva = this.listaNoticias ? this.listaNoticias[0] : null;
    },
    (error) => {

        console.log(error);
        this.estaCargando = false;
        this.listaNoticias = null;
    });

  }

  public ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  public seleccionarImagen(img) {
    this.imgSel = img;
  }

  public cerrarImagen() {
    this.imgSel = '';
  }

  public seleccionarNoticia(ntca: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Selecciona la noticia para mostrar el detalle de la misma.
    PARAMETROS:
      ntca. objeto que contiene la información de la noticia.
    ******************************************************************************************/
    this.noticiaActiva = ntca;
  }

  public siguiente() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Avanza a la siguiente noticia disponible. En caso de estar en la última noticia disponoble,
      se pasa la primera noticia de la lista.
    ******************************************************************************************/
    let idx = this.listaNoticias.indexOf(this.noticiaActiva);
    if (idx === this.listaNoticias.length - 1) {
      this.noticiaActiva = this.listaNoticias[0];
    } else {
      idx++;
      this.noticiaActiva = this.listaNoticias[idx];
    }
  }

  public anterior() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Tetrocede a la siguiente noticia disponible. En caso de estar en la primera noticia disponoble,
      se pasa la última noticia de la lista.
    ******************************************************************************************/
    let idx = this.listaNoticias.indexOf(this.noticiaActiva);
    if (idx === 0) {
      this.noticiaActiva = this.listaNoticias[this.listaNoticias.length - 1];
    } else {
      idx--;
      this.noticiaActiva = this.listaNoticias[idx];
    }
  }

}
