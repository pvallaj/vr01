import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { ConexionService } from '../../../servicios/Conexion.service';
import { MnsjDetalleComponent } from '../../mnsj-detalle/mnsj-detalle.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit, AfterViewInit {

  //detalle de catalogo
  fSelDet: number =-1;
  detCatalogo = new MatTableDataSource<any>();
  columnasDetalle:string[]=['id', 'nombre', 'narratio'];
  expandedElement:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private cn:ConexionService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.detCatalogo.paginator = this.paginator;
  }
  seleccionarDetalle(f){
    this.fSelDet=f.id;
    this.expandedElement = this.expandedElement === f ? null : f;
    console.log(this.expandedElement);
  }
  abrirDetalle(fila){
    console.log(fila);
    const dialogRef = this.dialog.open(MnsjDetalleComponent, {
      width: '70%',
      data: {nombre:fila.nombre, descripcion:fila.narratio}
    });

  }

  obtDetalle(cat){
    let h:string='';
    let limite=300;
    let temp=[];
    this.cn.sermones('categoria', cat.id)
    .subscribe(
      (data)=>{
        temp=data['resultado'];
        temp.forEach(el => {
          if(el.narratio.length>limite)
            el.resumen=el.narratio.substring(0,el.narratio.indexOf(' ',limite))+' ...';
          else
            el.resumen=el.narratio;
        });
        this.detCatalogo = new MatTableDataSource<any>(temp);
        this.detCatalogo.paginator = this.paginator;
      },
    (error)=>{
        console.log('No se logro la conexión');
        console.error(error);
      }
    )
  }

}
