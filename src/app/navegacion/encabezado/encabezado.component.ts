import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  @Output() navBarToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onToggleNV(){
    this.navBarToggle.emit();
  }

}
