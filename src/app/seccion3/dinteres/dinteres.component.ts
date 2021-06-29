import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dinteres',
  templateUrl: './dinteres.component.html',
  styleUrls: ['./dinteres.component.css']
})
export class DInteresComponent implements OnInit {
  @Input() tipo:string='detalle';
  constructor() { }

  ngOnInit(): void {
  }

}
