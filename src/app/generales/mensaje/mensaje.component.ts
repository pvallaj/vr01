import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogDatos {
  titulo:   string;
  mensaje:  string;
  tipo:     number
}

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent  {

  constructor(
    public dialogRef: MatDialogRef<MensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DialogDatos) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
