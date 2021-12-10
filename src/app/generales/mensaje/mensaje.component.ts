import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/*****************************************************************************************
  Descripción
    Crea una ventana modal para mostrar un mensaje de retroalimentación al usuario.
  Parametros
    titulo: Es el texto que aparecerá como título de la ventana modal.
    mensaje: Es el mensaje que se presentará en la ventana modal.
    tipo:
        1 para que la ventana muestre solo la opción "cerrar"
        2 para que la ventana muestre las opciones "cancelar" y "aceptar"

  Version: 1.0
  Fecha de liberación: 28/02/2021
  Registro de cambios:
******************************************************************************************/
export interface IDialogDatos{
  titulo: string;
  mensaje: string;
  tipo: number;
}

@Component({
  selector: 'app-mensaje',
  styleUrls: ['./mensaje.component.css'],
  templateUrl: './mensaje.component.html',
})
export class MensajeComponent  {

  constructor(
    public dialogRef: MatDialogRef<MensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: IDialogDatos) {

    }

}
