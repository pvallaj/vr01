import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mapa-vinculos',
  templateUrl: './mapa-vinculos.component.html',
  styleUrls: ['./mapa-vinculos.component.css']
})
export class MapaVinculosComponent implements OnInit {

  @Input() public datos:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public tto = {
    'placement': 'left', 
    'max-width':'400', 
    'theme':'dark',
    'tooltip-class':'tooltipC'
  }

  public listaResultado: MatTableDataSource<any>=null;
  public idNarrativaSel = 0;

  //------------------------------
  public columnasV:string[]=['id','autor','obra',  'narratio',
  'visuales', 'auditivos','presente_accion','ref_discurso','apltvo_recep','apltvo_espect'];

  public columnasO:string[]=[];

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

  public cerrarDetalle(){
    this.idNarrativaSel = 0 ;
  }
}
