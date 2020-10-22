import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConexionService } from '../../../servicios/Conexion.service';
import { DetalleCatalogoComponent } from '../detalle-catalogo/detalle-catalogo.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  @Input() detallecat: DetalleCatalogoComponent;
  //Catalogo
  fsel: number =-1;
  catalogo = new MatTableDataSource<any>();
  columnasCat: any[]=[];
  columnasPalabras:string[]=['id', 'palabra', 'descripcion'];
  columnasCategorias:string[]=['id', 'categoria', 'descripcion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private cn:ConexionService ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.catalogo.paginator = this.paginator;
  }

  obtCatalogo(fs){
    let h:string='';
    let limite=300;
    //this.fsel = fs.id;
    switch (fs.descripcion) {
      case "Palabras":
          this.columnasCat=this.columnasPalabras;
          break;
      case "Categorias":
          this.columnasCat=this.columnasCategorias;
          break;
      default:
        break;
    }

    this.cn.obtenerCatalogo(fs.descripcion)
    .subscribe(
      (data)=>{
        this.catalogo = new MatTableDataSource<any>(data['resultado']);
        this.catalogo.paginator = this.paginator;
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
      }
    )
  }

  seleccionar(fila){
    this.fsel=fila.id;
    this.detallecat.obtDetalle(fila);
  }
}
