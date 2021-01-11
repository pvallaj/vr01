import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})
export class EsperaComponent implements OnInit {
@Input() tipo:number=1;
  constructor() { }

  ngOnInit(): void {
  }

}
