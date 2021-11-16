import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-imagenes-sld',
  styleUrls: ['./imagenes-sld.component.css'],
  templateUrl: './imagenes-sld.component.html',
})
export class ImagenesSLDComponent implements OnInit, OnDestroy {
  /******************************************************************************************
  DESCRIPCIÓN:
  Genera el carrusel de imagenes de la sección principal de esta página.
  ******************************************************************************************/
  public imgSel = '';
  public lista: any[] = null;
  public estaCargando = false;
  public elemento = null;
  private intervalo;

  public elementoSel: any = null;

  constructor(private cnx: ConexionService) { }

  public ngOnInit(): void {
    this.estaCargando = true;
    this.cnx.novohisp({cantidad: 5}, 'imagenes aleatorias').subscribe(
      (datos) => {
        this.lista = datos['resultado'];
        this.estaCargando = false;

    },
    (error) => {

        console.log(error);
        this.estaCargando = false;
        this.lista = null;
    });

    this.intervalo = setInterval(() => {
      this.estaCargando = true;
      this.cnx.novohisp({cantidad: 5}, 'imagenes aleatorias').subscribe(
        (datos) => {
          this.lista = datos['resultado'];
          this.estaCargando = false;

      },
      (error) => {

          console.log(error);
          this.estaCargando = false;
          this.lista = null;
      });
    }, 15000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  public seleccionar(e: any) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Muestra una ventana con el detalle, información relacionada a la imagen, de unas de las imagenes del carrusel.
    PARAMETROS:
      e. contiene la información del elemento seleccionado.
    RESULTADO:
      Ninguno.
    ******************************************************************************************/
    this.elementoSel = e;
    let ligas = (this.elementoSel.etiquetas as string).split(',');
    ligas = ligas.filter(( e ) => e.indexOf('capitulo') >= 0);
    this.elementoSel.ligas = ligas;

    clearInterval(this.intervalo);
  }

  public quitarSeleccion() {
    /******************************************************************************************
    DESCRIPCIÓN:
      Cierra la ventana que muestra el detalle.
    PARAMETROS:
      Ninguno.
    RESULTADO:
      Ninguno.
    ******************************************************************************************/
    this.elementoSel = null;
    this.intervalo = setInterval(() => {
      this.estaCargando = true;
      this.cnx.novohisp({cantidad: 5}, 'imagenes aleatorias').subscribe(
        (datos) => {
          this.lista = datos['resultado'];
          this.estaCargando = false;

      },
      (error) => {

          console.log(error);
          this.estaCargando = false;
          this.lista = null;
      });
    }, 15000);
  }

}
