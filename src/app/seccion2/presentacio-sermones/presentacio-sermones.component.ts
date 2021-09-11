import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacio-sermones',
  templateUrl: './presentacio-sermones.component.html',
  styleUrls: ['./presentacio-sermones.component.css']
})
export class PresentacioSermonesComponent implements OnInit {

  public secVisible='';
  public vIsotipo=false;
  
  constructor() { }

  ngOnInit(): void {
  }

  
  public moAyuda(seccion){

    if(this.secVisible==seccion){

      this.secVisible='';
    }else{

      this.secVisible=seccion;
    }

  }
  
}
