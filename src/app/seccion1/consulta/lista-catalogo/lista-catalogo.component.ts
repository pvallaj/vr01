import { Component, Input, OnInit } from '@angular/core';
import { CatalogoComponent } from '../catalogo/catalogo.component';

@Component({
  selector: 'app-lista-catalogo',
  templateUrl: './lista-catalogo.component.html',
  styleUrls: ['./lista-catalogo.component.css']
})
export class ListaCatalogoComponent implements OnInit {
  @Input() catalogo: CatalogoComponent;
  //Lista de catalogos
  listaCatalogos:any=[{id:1, descripcion:'Palabras'},
                      {id:2, descripcion:'Categorias'},
                      {id:3, descripcion:'Tipo de Accion'},
                      {id:4, descripcion:'Tipo de motivo'}];
  columnasLC:string[]=['id', 'descripcion'];
  seleccionado:{
    id:number,
    descripcion:string
  }={id:-1, descripcion:''};

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(fila){
    this.seleccionado=fila;
    this.catalogo.obtCatalogo(fila);
  }
}
