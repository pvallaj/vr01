import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DatosMsj {
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-mnsj-detalle',
  templateUrl: './mnsj-detalle.component.html',
  styleUrls: ['./mnsj-detalle.component.css']
})
export class MnsjDetalleComponent  {


  constructor(
    public dialogRef: MatDialogRef<MnsjDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosMsj) {}
}
