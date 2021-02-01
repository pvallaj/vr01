import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Signos {
  id:number,
  autor:string,
  obra:string, 
  narratio:string,
  gestos_dramaticos:string, 
  movimientos_dramaticos:string,
  voz_dramaticos:string,
  vista_dramaticos:string,
  gestos_dramaticos_no:string, 
  movimientos_dramaticos_no:string,
  voz_dramaticos_no:string,
  vista_dramaticos_no:string
}

@Component({
  selector: 'app-mapa-signos',
  templateUrl: './mapa-signos.component.html',
  styleUrls: ['./mapa-signos.component.css']
})
export class MapaSignosComponent implements OnInit, AfterViewInit {
  @Input() public datos:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public listaResultadoSA:MatTableDataSource<Signos>=null;
  //------------------------------
  public moGD=true;
  public moMD=true;
  public moVoD=true;
  public moViD=true;
  public moGDn=true;
  public moMDn=true;
  public moVoDn=true;
  public moViDn=true;

  //------------------------------
  public columnasSA:string[]=['id_texto','autor','obra', 'narratio',
  'gestos_dramaticos', 'movimientos_dramaticos','voz_dramaticos',
  'gestos_dramaticos_no', 'movimientos_dramaticos_no','voz_dramaticos_no'];

  public columnasSAT1:string[]=['id_texto','autor','obra', 'narratio','g2','g3']
  public columnasSAT2:string[]=[
    'gestos_dramaticos', 'movimientos_dramaticos','voz_dramaticos',
    'gestos_dramaticos_no', 'movimientos_dramaticos_no','voz_dramaticos_no'];

  constructor() { }

  ngOnInit(): void {
    this.listaResultadoSA=new MatTableDataSource<Signos>(this.datos)
  }

  ngAfterViewInit(){
    this.listaResultadoSA.paginator = this.paginator;
    this.listaResultadoSA.sort = this.sort;
  }
  public cambiarGD(e){
    if(!this.moGD){
      this.columnasSA.splice(4,0,'gestos_dramaticos');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='gestos_dramaticos');
    }
    this.moGD=!this.moGD;
  }
  public cambiarGDn(e){
    if(!this.moGDn){
      this.columnasSA.splice(8,0,'gestos_dramaticos_no');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='gestos_dramaticos_no');
    }
    this.moGDn=!this.moGDn;
  }
  public cambiarMD(e){
    if(!this.moMD){
      this.columnasSA.splice(5,0,'movimientos_dramaticos');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='movimientos_dramaticos');
    }
    this.moMD=!this.moMD;
  }
  public cambiarMDn(e){
    if(!this.moMDn){
      this.columnasSA.splice(9,0,'movimientos_dramaticos_no');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='movimientos_dramaticos_no');
    }
    this.moMDn=!this.moMDn;
  }
  public cambiarVoD(e){
    if(!this.moVoD){
      this.columnasSA.splice(6,0,'voz_dramaticos');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='voz_dramaticos');
    }
    this.moVoD=!this.moVoD;
  }
  public cambiarVoDn(e){
    if(!this.moVoDn){
      this.columnasSA.splice(10,0,'voz_dramaticos_no');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='voz_dramaticos_no');
    }
    this.moVoDn=!this.moVoDn;
  }
  public cambiarViD(e){
    if(!this.moViD){
      this.columnasSA.splice(7,0,'vista_dramaticos');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='vista_dramaticos');
    }
    this.moViD=!this.moViD;
  }
  public cambiarViDn(e){
    if(!this.moViDn){
      this.columnasSA.splice(11,0,'vista_dramaticos_no');
    }else{
      this.columnasSA=this.columnasSA=this.columnasSA.filter(el=>el!='vista_dramaticos_no');
    }
    this.moViDn=!this.moViDn;
  }
  public aplicarFiltro(e){
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    console.log( filterValue.trim().toLowerCase());
    this.listaResultadoSA.filter = filterValue.trim().toLowerCase();

    if (this.listaResultadoSA.paginator) {
      this.listaResultadoSA.paginator.firstPage();
    }
  }

}
