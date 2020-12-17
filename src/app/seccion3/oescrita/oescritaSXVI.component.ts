import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-oescrita',
  templateUrl: './oescritaSXVI.component.html',
  styleUrls: ['./oescritaSXVI.component.css'],
})
export class OEscritaSXVIComponent implements OnInit {
  public items: TreeviewItem[];
  public values: number[];
  public estaCargando=false;
  public config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight:750
 });

  constructor(private cnx: ConexionService) { }

  ngOnInit(): void {
    //this.items=this.service.getBooks();
    console.log('iniciando consulta de estructura');
    this.estaCargando=true;
    this.cnx.novohisp(null, 'consulta estructura').subscribe(
      (datos) => {
        this.items=[new TreeviewItem(JSON.parse(datos['resultado'][0].valor))]; 
        setTimeout(()=>{
          this.estaCargando=false;
          console.log('Se terminaron los 3 segundos');
        }, 3000);
    },(error) => {
      console.log('error al cargar a los autores');
      console.log(error);
    });
  }
  onFilterChange(value: string): void {
    console.log('filter:', value);
  }
  onSelectedChange(value: any): void {
    console.log('change:', value);
    console.log(value);
  }

  private delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
}



