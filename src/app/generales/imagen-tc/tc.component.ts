import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tc',
  templateUrl: './tc.component.html',
  styleUrls: ['./tc.component.css']
})
export class TCComponent implements OnInit {
  @Input() referencia:string;
  @Input() tipo:string;
  @Input() elemento:any;
  @Output() quitar=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  public cerrar(){
    console.log("cerrar ..");
    this.quitar.emit('cerrar');
  }
}
