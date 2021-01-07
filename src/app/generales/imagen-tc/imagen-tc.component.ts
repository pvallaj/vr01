import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imagen-tc',
  templateUrl: './imagen-tc.component.html',
  styleUrls: ['./imagen-tc.component.css']
})
export class ImagenTCComponent implements OnInit {
  @Input() imagen:string;
  @Output() quitar=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  public cerrar(){
    console.log("cerrar ..");
    this.quitar.emit('cerrar');
  }
}
