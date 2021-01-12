import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-oe',
  templateUrl: './detalle-oe.component.html',
  styleUrls: ['./detalle-oe.component.css']
})
export class DetalleOEComponent implements OnInit {
  @Input() elemento:any;
  @Input() tipo:number=1; //1.- Detalle completo, 2.- Detalle resumido

  constructor() { }

  ngOnInit(): void {
  }

  recorta(texto:string, largo:number):string{
    if (texto.length > largo) {
      return texto.substring(0, (texto.indexOf(' ', largo))>0?(texto.indexOf(' ', largo)):texto.length) + '...';
    }
    return texto;
  }
}