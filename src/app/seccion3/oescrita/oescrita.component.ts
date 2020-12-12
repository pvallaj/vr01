import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-oescrita',
  templateUrl: './oescrita.component.html',
  styleUrls: ['./oescrita.component.css'],
})
export class OEscritaComponent implements OnInit {
  items: TreeviewItem[];
  values: number[];
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
    this.cnx.novohisp(null, 'consulta estructura').subscribe(
      (datos) => {
        this.items=[new TreeviewItem(JSON.parse(datos['resultado'][0].valor))]; 
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
}



