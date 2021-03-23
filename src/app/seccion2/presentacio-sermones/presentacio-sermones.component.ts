import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacio-sermones',
  templateUrl: './presentacio-sermones.component.html',
  styleUrls: ['./presentacio-sermones.component.css']
})
export class PresentacioSermonesComponent implements OnInit {

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
