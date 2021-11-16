import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mapa-vinculos',
  styleUrls: ['./mapa-vinculos.component.css'],
  templateUrl: './mapa-vinculos.component.html',
})
export class MapaVinculosComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Consulta y muestra los datos relacionados al mapa de vinculos.
  Crear un alista con las relaciones y los datos de vinculos:
    visuales.
    auditivos.
    Expresiones que reflejan el impacto emocional en la relación.
    referencia al meta discurso.
    Apelativos al receptor de la relación.
    Apelativos al espectador.
  Este mapa tiene la siguiente funcionalidad:
    Filtro. Permite filtrar los registros de las relaciones mostrando solo aquellos que contengan
            el texto introducido por el usuario.
    Mostrar/ocultar columna. Cada columna tiene un icono "X" que permite ocultar la columna, la cual
            se puede volver a mostrar seleccionandola en la lista de campos que aparece en la parte
            superior de la pantalla.
    Ordenar. Se pueden ordenar los registros de acuerdo a cada columna, en forma ascendente o desendente.
            El usuario solo debe hacer click en el titulo de la columna para aplicar el orden.
  ******************************************************************************************/
  @Input() public datos: any;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public tto = {
    'max-width': '400',
    placement: 'left',
    theme: 'dark',
    'tooltip-class': 'tooltipC',
  };

  public listaResultado: MatTableDataSource<any> = null;
  public idNarrativaSel = 0;

  // ------------------------------
  public columnasV: string[] = ['id', 'autor', 'obra',  'narratio',
  'visuales', 'auditivos', 'presente_accion', 'ref_discurso', 'apltvo_recep', 'apltvo_espect'];

  public columnasO: string[] = [];

  constructor(private paginatorConf: MatPaginatorIntl) {
    this.paginatorConf.itemsPerPageLabel = 'Elementos por página';
    this.paginatorConf.nextPageLabel = 'Siguiente página';
    this.paginatorConf.previousPageLabel = 'Página Anterior';
  }

  public ngOnInit(): void {
    this.listaResultado = new MatTableDataSource<any>(this.datos);
  }

  public ngAfterViewInit() {
    this.listaResultado.paginator = this.paginator;
    this.listaResultado.sort = this.sort;
  }

  public cambiar(e: string, p: number) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Muestra y oculta una de las columnas de la lista.
    PARAMETROS:
      e. es el nombre de la columna que cambia de visible a oculta y viseversa.
      p. posición de la columna.
    ******************************************************************************************/
    if (this.columnasV.indexOf(e) === -1) {
      this.columnasV.splice(p, 0, e);
      this.columnasO = this.columnasO.filter((el) => el !== e);
    } else {
      this.columnasV = this.columnasV.filter((el) => el !== e);
      this.columnasO.push(e);
    }

  }

  public estaVisible(c: string): boolean {
    /******************************************************************************************
    DESCRIPCIÓN:
      Determina si una columna esta visible o no.
    PARAMETROS:
      c. nombre de la columna a evaluar.
    RESULTADO:
      true si es visible, false si no.
    ******************************************************************************************/
    if (this.columnasV.indexOf(c) === -1) {
    return false;
    }
    return true;
  }

  public aplicarFiltro(event) {
    /******************************************************************************************
    DESCRIPCIÓN:
      filtra los registros. Deja visible solo los registros que contienen el texto proporcionado por el
      usuario.
    PARAMETROS:
      evento. objeto que contiene los datos evento generados por la acción de tecleado del usuario,
            entre los datos, el elemento "value" contiene el texto introducido por el usuario.
    RESULTADO:
    ******************************************************************************************/
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaResultado.filter = filterValue.trim().toLowerCase();

    if (this.listaResultado.paginator) {
      this.listaResultado.paginator.firstPage();
    }
  }

  public cerrarDetalle() {
    /******************************************************************************************
    DESCRIPCIÓN:
    cierra la ventana de detalle de la relación seleccionada por el usuario.
    ******************************************************************************************/
    this.idNarrativaSel = 0 ;
  }
}
