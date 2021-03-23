import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacio-relaciones',
  templateUrl: './presentacio-relaciones.component.html',
  styleUrls: ['./presentacio-relaciones.component.css']
})
export class PresentacioRelacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public secVisible='';

  public moAyuda(seccion){
    console.log(this.secVisible);
    console.log(seccion);
    if(this.secVisible==seccion){
      console.log('limpiando');
      this.secVisible='';
    }else{
      console.log('asignando');
      this.secVisible=seccion;
    }
    console.log(this.secVisible);
  }
}
