import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-presentacio-relaciones',
  templateUrl: './presentacio-relaciones.component.html',
  styleUrls: ['./presentacio-relaciones.component.css']
})
export class PresentacioRelacionesComponent implements OnInit {

  @ViewChild('marca') 
  inputMessageRef: ElementRef;

  constructor() { }
  
  ngOnInit(): void {
    console.log("a la marca...");
    document.querySelector('#marca').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  public secVisible='';

  public moAyuda(seccion){
    //console.log(this.secVisible);
    //console.log(seccion);
    if(this.secVisible==seccion){
      //console.log('limpiando');
      this.secVisible='';
    }else{
      //console.log('asignando');
      this.secVisible=seccion;
    }
    //console.log(this.secVisible);
  }
}
