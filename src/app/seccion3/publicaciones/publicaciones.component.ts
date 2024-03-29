import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
  encapsulation : ViewEncapsulation.None, 
})
export class PublicacionesComponent implements OnInit {

  public estaCargando = false;
  public resultado: any[] = null;
  public imagenes: {
    capitulo: string,
    descripcion: string
    etiquetas: string
    id: number
    referencia: string
    referencia_2: string
    texto: string
    tipo: number}  = null;

  public regsCapitulo: any[] = null;
  public portada: any = null;
  public capituloSel = null;

  public om_estructura = true;
  public om_detalle = true;
  public om_lista = true;
  public ctrlVisible = false;

  private seccionesVisibles: string[] = [];
  public elementoSeleccionado: any;

  public tipoReferencia: string = null;
  public referencia: string = null;

  public siglo = '';
  public tomo = '';
  public primerCapitulo:any=null;
  public ultimoCapitulo:any=null;
  public vIsotipo=false;

  constructor(private cnx: ConexionService, private ar: ActivatedRoute) {

    
  }

  public ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.siglo = this.ar.snapshot.params.siglo;
      this.tomo = this.ar.snapshot.params.tomo;
      this.resultado=null;
      this.regsCapitulo=null;
      this.seccionesVisibles= [];
      this.imagenes=null;
      this.cargaDatosTomo();
      this.cargaDatosTomo();
    })
  }

  private cargaDatosTomo(){
    this.estaCargando = true;
    this.cnx.novohisp({tomo: this.siglo + '-' + this.tomo}, 'consulta estructura x tomo').subscribe(
      (datos) => {
        this.estaCargando = false;
        this.resultado = datos['resultado'].estructura;
        this.imagenes = datos['resultado'].imagenes[0];
        let seccionA = '';
        this.primerCapitulo=this.resultado[1];
        this.ultimoCapitulo=this.resultado[this.resultado.length-1];

        for (let index = 0; index < this.resultado.length; index++) {
          const element = this.resultado[index];
          if (element.etiquetas.indexOf('seccion-') >= 0) {
            seccionA = element.etiquetas.split(',')[1];
          } else {
            element.etiquetas = element.etiquetas + ', ' + seccionA;
          }
        }

    }, (error) => {

      console.log(error);
    });
  }

  public verCapitulo(elemento: any) {

    if (elemento.etiquetas.indexOf('seccion') >= 0 && elemento.etiquetas.indexOf('capitulo') < 0) { 
      return; 
    }
    this.regsCapitulo = null;
    this.capituloSel = elemento;
    const etiquetas = elemento.etiquetas;
    let listae = etiquetas.split(',');
    if(this.seccionesVisibles.indexOf(listae[listae.length-1])<0){
      this.seccionesVisibles.push(listae[listae.length-1]);
    }
    listae = listae.filter((e) => e.trim() != 'estructura');
    listae = listae.filter((e) => e.indexOf('seccion') < 0);
    const capituloSeleccionado = listae.join(',');

    this.estaCargando = true;
    this.cnx.novohisp({capitulo: capituloSeleccionado, idc:elemento.id}, 'consulta capitulo tomo').subscribe(
      (datos) => {
        this.estaCargando = false;
        this.regsCapitulo = datos['resultado'].capitulo;
        this.portada = {...this.regsCapitulo[0]};
        this.regsCapitulo.splice(0, 1);


    }, (error) => {

      console.log(error);
    });
  }

  public verTomo() {
    this.capituloSel = null;
  }

  public mostrarPortada(e:any){
    /*****************************************************************************************
      Descripción
        Abre la ventana que mostrará la portada en tamaño completo.
      Parametros
        cp. Capitulo
      Resultado
        true/false
    ******************************************************************************************/

        this.tipoReferencia = 'Portada';
        this.elementoSeleccionado = e;
        this.referencia = e.referencia;
  }
  public verDetalle(e: any) {
     /*****************************************************************************************
      Descripción
        Abre la ventana que mostrará el detalle de la tarjeta seleccionada.
      Parametros
        cp. Capitulo
      Resultado
        true/false
    ******************************************************************************************/
  
        this.tipoReferencia = 'buscar';
        this.elementoSeleccionado = e;
        this.referencia = 'varios';

  }

  public cerrarDetalle(idc:number) {
    /*****************************************************************************************
      Descripción
        Cierra la ventana de detalle.
        En caso de que el parametro sea mayor que 0, implica abir el capitulo con dicho id
      Parametros
        idc. Capitulo a abrir, 0 para no abrir capitulo.
      Resultado
        Ninguno
    ******************************************************************************************/
    this.tipoReferencia = null;
    this.referencia = null;
    this.elementoSeleccionado = null;
    if(idc===0) return;
    this.verCapitulo({etiquetas:'XVI-Tomo1, capitulo-0, estructura',id:idc});
  }

  public indiceTarjeta(i: number): number {
    return 200 - i;
  }

  public siguiente() {
    /*****************************************************************************************
      Descripción
        Permite avanzar al siguiente capitulo
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/
    if(this.capituloSel==null){
      this.capituloSel=this.primerCapitulo;
      this.verCapitulo(this.resultado[1]);
      return;
    }
    
    const idxA = this.resultado.indexOf(this.capituloSel);
    
    const sig = this.resultado[idxA + 1];
    if(sig==null){
      this.verTomo();
    }
    if (sig.etiquetas.indexOf('seccion') >= 0 && sig.etiquetas.indexOf('capitulo') < 0) {
      this.verCapitulo(this.resultado[idxA + 2]);
    } else {
      this.verCapitulo(this.resultado[idxA + 1]);
    }
    
  }
  public anterior() {
    /*****************************************************************************************
      Descripción
        Permite regresar al capitulo anterior
      Parametros
        Ninguno
      Resultado
        Ninguno
    ******************************************************************************************/
      if(this.capituloSel===this.primerCapitulo){
        this.capituloSel=null;
        return;
      }

      const idxA = this.resultado.indexOf(this.capituloSel);

      const ant = this.resultado[idxA - 1];
      if (ant.etiquetas.indexOf('seccion') >= 0  && ant.etiquetas.indexOf('capitulo') < 0) {
        this.verCapitulo(this.resultado[idxA - 2]);
      } else {
        this.verCapitulo(this.resultado[idxA - 1]);
      }
  }
  public esCapitulo(reg:any): boolean {
    /*****************************************************************************************
      Descripción
        determina si es un capitulo (regresa true), en caso contrario es una sección.
      Parametros
        cp. Capitulo
      Resultado
        true/false
    ******************************************************************************************/
   if (reg.etiquetas.indexOf('seccion')>=0 && reg.etiquetas.indexOf('capitulo') >= 0) { return true; }
   return false;
  }

  public desplegarCapitulo(cp: any) {
    /*****************************************************************************************
      Descripción
        determina si el capitulo se despliega en la barra lateral o no.
      Parametros
        cp. Capitulo
      Resultado
        true/false
    ******************************************************************************************/
      const resultado = false;
      const etiquetas: string = cp.etiquetas;
      if (etiquetas.indexOf('capitulo') < 0) { return false; } // no es un capitulo, es una sección.
      for (const i of this.seccionesVisibles) {
        if (etiquetas.indexOf(i) >= 0) {
          return true;
        }
      }
      return false;
  }
  public estaExpandido(sec: string): boolean {
    /*****************************************************************************************
      Descripción
        Dice si la sección esta expandida o no.
      Parametros
        sec. sección a evaluar
      Resultado
        true/false
    ******************************************************************************************/
    const seccion = sec.split(',')[1];
    if (this.seccionesVisibles.indexOf(seccion) >= 0) {  return true; }
    return false;
  }
  public moSeccion(sec: string) {
    /*****************************************************************************************
      Descripción
        Si la sección No esta expandida, la agrega a la lista de secciones que deben estar expandidas. de lo contrario la quita de la lista.
        sirve como un switch para expandir o contrar las secciones.
        Solo las secciones que estan en la lista, se muestran expandidas.
      Parametros
        sec. sección a expandir o contraer.
      Resultado
        true/false
    ******************************************************************************************/

    if (sec.indexOf('seccion') < 0) { return; }
    const capitulo = sec.split(',')[1];
    if (this.seccionesVisibles.indexOf(capitulo) >= 0) {
      // esta visible y hay que quitarlo
      this.seccionesVisibles = this.seccionesVisibles.filter((e) => e.indexOf(capitulo) < 0);
    } else {
      // no esta visible y hay que agregarlo
      this.seccionesVisibles.push(capitulo);
    }

  }


  public cambiarTomo(tomo: string) {
    /*****************************************************************************************
      Descripción
        Cambia el tomo activo y carga los datos correspondientes.
      Parametros
        tomo. El nuevo tomo activo.
      Resultado
        true/false
    ******************************************************************************************/
    this.tomo = tomo;
    this.resultado=null;
    this.regsCapitulo=null;
    this.seccionesVisibles= [];
    this.imagenes=null;
    this.capituloSel=null;
    this.cargaDatosTomo();
  }



}
