import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { SplitComponent, SplitAreaDirective } from 'angular-split'

import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-oescrita',
  templateUrl: './oescritaSXVI.component.html',
  styleUrls: ['./oescritaSXVI.component.css'],
})
export class OEscritaSXVIComponent implements OnInit {
  @ViewChild('split') split: SplitComponent
  @ViewChild('area1') area1: SplitAreaDirective
  @ViewChild('area2') area2: SplitAreaDirective
  //Para la estructura de arbol.
  public items: TreeviewItem[];
  public values: number[];
  public config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight:null
 });

 //
 public estaCargando=false;
 public estaCargandoDetalle=false;
 public idxSeleccionado=0;
 //
 public resultado:any[];
 public elementoSeleccionado:any;
 //secciones
  public om_estructura=true;
  public om_detalle=true;
  public om_lista=true;
  public ctrlVisible=false;

  constructor(private cnx: ConexionService) { }

  ngOnInit(): void {
    //this.items=this.service.getBooks();

    this.estaCargando=true;
    this.cnx.novohisp(null, 'consulta estructura').subscribe(
      (datos) => {
        this.items=[new TreeviewItem(JSON.parse(datos['resultado'][0].valor))]; 
        setTimeout(()=>{
          this.estaCargando=false;

        }, 3000);
    },(error) => {

      console.log(error);
    });
  }
  onFilterChange(value: string): void {

  }
  onSelectedChange(value: string[]): void {

    this.estaCargandoDetalle=true;
    this.cnx.novohisp({terminos:value.join(', ')}, 'consulta obra escrita').subscribe(
      (datos) => {
       this.resultado=datos['resultado'];
       this.estaCargandoDetalle=false;
    },(error) => {

      console.log(error);
    });
  }

  


  public iniciaMovimiento(e){
    console.log(e);
  }
  private delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
}



