import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-presentacio-relaciones',
  templateUrl: './presentacio-relaciones.component.html',
  styleUrls: ['./presentacio-relaciones.component.css']
})
export class PresentacioRelacionesComponent implements OnInit {

  @ViewChild('marca') 
  inputMessageRef: ElementRef;

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
