import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mapa-contexto',
  styleUrls: ['./mapa-contexto.component.css'],
  templateUrl: './mapa-contexto.component.html',
})
export class MapaContextoComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra una tabla con los datos relacionados al "Contexto" de las relaciones.
  Este mapa tiene la siguiente funcionalidad.

  Filtro. Permite que el usuario especifique un texto y se filtraran los registro que contengan dicho texto.
  Seleccion de campos. El usuario puede quitar las columnas que se muestran y agregarlas nuevamente.
  Paginación. Permite mostrar N registros por pagina, asi como cambiar entre las paginas, al mismo
              tiempo, permite determinar el numero de elementos por pagina.
  ******************************************************************************************/
  @Input() public datos: any;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public listaResultado: MatTableDataSource<any> = null;

  // ------------------------------
  public columnasV: string[] = ['id', 'autor', 'obra', 'narratio',
  'argumento', 'accion_dramatica', 'marco_anterior', 'marco_posterior', 'formula_apertura',
  'formula_cierre', 'tiempo', 'tiempo_referido'];

  public columnasO: string[] = [];
  public idNarrativaSel = 0;
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
    Permite ocultar o mostrar la columna especificada. En caso de que este visible se oculta y viseversa.
    PARAMETROS:
    e. es el nombre de la columna.
    p. es el indice que indica la posición de la columna.
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
    Determina si la columna especificada esta visible o no.
    ******************************************************************************************/
    if (this.columnasV.indexOf(c) === -1) {
    return false;
    }
    return true;
  }

  public aplicarFiltro(event) {
    /******************************************************************************************
    DESCRIPCIÓN:
    Filtra los registros que contienen el texto especificado por el usuario.
    ******************************************************************************************/
    const filterValue = (event.target as HTMLInputElement).value;

    this.listaResultado.filter = filterValue.trim().toLowerCase();

    if (this.listaResultado.paginator) {
      this.listaResultado.paginator.firstPage();
    }
  }

}
