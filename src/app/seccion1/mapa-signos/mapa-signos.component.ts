import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ISignos {
  id: number;
  autor: string;
  obra: string;
  narratio: string;
  gestos_dramaticos: string;
  movimientos_dramaticos: string;
  voz_dramaticos: string;
  vista_dramaticos: string;
  gestos_dramaticos_no: string;
  movimientos_dramaticos_no: string;
  voz_dramaticos_no: string;
  vista_dramaticos_no: string;
}

@Component({
  selector: 'app-mapa-signos',
  styleUrls: ['./mapa-signos.component.css'],
  templateUrl: './mapa-signos.component.html',
})
export class MapaSignosComponent implements OnInit, AfterViewInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Realiza la consulta y muestra los datos del mapa de signos.
  Construye una lista con las relaciones y sus signos.
  Este mapa incluye la siguiente funcionalidad:
  A. Filtro, permite filtrar los registros que contienen el termino escrito por el usuario.
  B. Ordenar las columnas en forma ascendente o desendente. Cuando el usuario da click en el
     Encabezado de las columnas, el donde cambia de ascendente a desendente y viseversa.
  ******************************************************************************************/
  @Input() public datos: any;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public listaResultadoSA: MatTableDataSource<ISignos> = null;
  // ------------------------------
  public moGD = true;
  public moMD = true;
  public moVoD = true;
  public moViD = true;
  public moGDn = true;
  public moMDn = true;
  public moVoDn = true;
  public moViDn = true;

  public idNarrativaSel = 0;

  // ------------------------------
  public columnasSA: string[] = ['id_texto', 'autor', 'obra', 'narratio',
  'gestos_dramaticos', 'movimientos_dramaticos', 'voz_dramaticos',
  'gestos_dramaticos_no', 'movimientos_dramaticos_no', 'voz_dramaticos_no'];

  public columnasSAT1: string[] = ['id_texto', 'autor', 'obra', 'narratio', 'g2', 'g3'];
  public columnasSAT2: string[] = [
    'gestos_dramaticos', 'movimientos_dramaticos', 'voz_dramaticos',
    'gestos_dramaticos_no', 'movimientos_dramaticos_no', 'voz_dramaticos_no'];

    constructor(private paginatorConf: MatPaginatorIntl) {
      this.paginatorConf.itemsPerPageLabel = 'Elementos por página';
      this.paginatorConf.nextPageLabel = 'Siguiente página';
      this.paginatorConf.previousPageLabel = 'Página Anterior';
    }

  public ngOnInit(): void {
    this.listaResultadoSA = new MatTableDataSource<ISignos>(this.datos);
  }

  public ngAfterViewInit() {
    this.listaResultadoSA.paginator = this.paginator;
    this.listaResultadoSA.sort = this.sort;
  }
  public cambiarGD(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Gestos dramaticos" en la sección de "signos en los actores dramaticos"
    ******************************************************************************************/
    if (!this.moGD) {
      this.columnasSA.splice(4, 0, 'gestos_dramaticos');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'gestos_dramaticos');
    }
    this.moGD = !this.moGD;
  }
  public cambiarGDn(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Gestos dramaticos" en la sección de "Signos en los pesonajes de la relación"
    ******************************************************************************************/
    if (!this.moGDn) {
      this.columnasSA.splice(8, 0, 'gestos_dramaticos_no');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'gestos_dramaticos_no');
    }
    this.moGDn = !this.moGDn;
  }
  public cambiarMD(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Moviminetos dramaticos" en la sección de "signos en los actores dramaticos"
    ******************************************************************************************/
    if (!this.moMD) {
      this.columnasSA.splice(5, 0, 'movimientos_dramaticos');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'movimientos_dramaticos');
    }
    this.moMD = !this.moMD;
  }
  public cambiarMDn(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Movimientos corporales" en la sección de "Signos en los pesonajes de la relación"
    ******************************************************************************************/
    if (!this.moMDn) {
      this.columnasSA.splice(9, 0, 'movimientos_dramaticos_no');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'movimientos_dramaticos_no');
    }
    this.moMDn = !this.moMDn;
  }
  public cambiarVoD(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Modulación de Voz" en la sección de "signos en los actores dramaticos"
    ******************************************************************************************/
    if (!this.moVoD) {
      this.columnasSA.splice(6, 0, 'voz_dramaticos');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'voz_dramaticos');
    }
    this.moVoD = !this.moVoD;
  }
  public cambiarVoDn(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Modulación de voz" en la sección de "Signos en los pesonajes de la relación"
    ******************************************************************************************/
    if (!this.moVoDn) {
      this.columnasSA.splice(10, 0, 'voz_dramaticos_no');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'voz_dramaticos_no');
    }
    this.moVoDn = !this.moVoDn;
  }
  public cambiarViD(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Vista dramaticas" en la sección de "signos en los actores dramaticos"
    ******************************************************************************************/
    if (!this.moViD) {
      this.columnasSA.splice(7, 0, 'vista_dramaticos');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'vista_dramaticos');
    }
    this.moViD = !this.moViD;
  }
  public cambiarViDn(e) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Oculta o muestra la columna de "Movimientos corporales" en la sección de "Signos en los pesonajes de la relación"
    ******************************************************************************************/
    if (!this.moViDn) {
      this.columnasSA.splice(11, 0, 'vista_dramaticos_no');
    } else {
      this.columnasSA = this.columnasSA = this.columnasSA.filter((el) => el !== 'vista_dramaticos_no');
    }
    this.moViDn = !this.moViDn;
  }
  public aplicarFiltro(event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.listaResultadoSA.filter = filterValue.trim().toLowerCase();

    if (this.listaResultadoSA.paginator) {
      this.listaResultadoSA.paginator.firstPage();
    }
  }

}
