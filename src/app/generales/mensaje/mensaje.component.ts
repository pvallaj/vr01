import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/*****************************************************************************************
  Descripción
    Crea una ventana modal para mostrar un mensaje de retroalimentación al usuario.
  Parametros
    titulo: Es el texto que aparecerá como título de la ventana modal.
    mensaje: Es el mensaje que se presentará en la ventana modal.
    tipo:
        1 para que la ventana muestre solo la opción "cerrar"
        2 para que la centana muestre las opciones "cancelar" y "aceptar"
      
  Version: 1.0
  Fecha de liberación: 28/02/2021
  Registro de cambios:
******************************************************************************************/
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

}
