import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  @Output() navBarToggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onToggleNV(){
    this.navBarToggle.emit();
  }
}
