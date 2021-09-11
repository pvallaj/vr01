import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mapa-contexto',
  templateUrl: './mapa-contexto.component.html',
  styleUrls: ['./mapa-contexto.component.css']
})
export class MapaContextoComponent implements OnInit {
  @Input() public datos:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public listaResultado:MatTableDataSource<any>=null;


  // ------------------------------
  public columnasV:string[]=['id','autor','obra', 'narratio',
  'argumento','accion_dramatica', 'marco_anterior','marco_posterior','formula_apertura',
  'formula_cierre','tiempo','tiempo_referido'];

  public columnasO: string[] = [];
  public idNarrativaSel = 0;
  constructor(private paginatorConf: MatPaginatorIntl) { 
    this.paginatorConf.itemsPerPageLabel = 'Elementos por página';
    this.paginatorConf.nextPageLabel = 'Siguiente página';
    this.paginatorConf.previousPageLabel = 'Página Anterior';
  }

  ngOnInit(): void {
    this.listaResultado=new MatTableDataSource<any>(this.datos)
  }

  ngAfterViewInit(){
    this.listaResultado.paginator = this.paginator;
    this.listaResultado.sort = this.sort;
  }
  public cambiar(e:string, p:number){
    if(this.columnasV.indexOf(e)==-1){
      this.columnasV.splice(p,0,e);
      this.columnasO=this.columnasO.filter(el=>el!=e);
    }else{
      this.columnasV=this.columnasV.filter(el=>el!=e);
      this.columnasO.push(e);
    }

  }

  public estaVisible(c:string):boolean{
    if(this.columnasV.indexOf(c)==-1)
    return false;
    return true;
  }
  public aplicarFiltro(e){
    const filterValue = (event.target as HTMLInputElement).value;

    this.listaResultado.filter = filterValue.trim().toLowerCase();

    if (this.listaResultado.paginator) {
      this.listaResultado.paginator.firstPage();
    }
  }
}
