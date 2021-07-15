
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dinteres',
  templateUrl: './dinteres.component.html',
  styleUrls: ['./dinteres.component.css']
})
export class DInteresComponent implements OnInit {
  @Input() tipo:string='detalle';

  @ViewChild('diccionario') diccionario: any;
  @ViewChild('proyectos') proyectos: any;
  @ViewChild('bibliotecas') biblioteca: any;
  @ViewChild('revistas') revistas: any;
  @ViewChild('artes') artes: any;

  constructor() { }

  ngOnInit(): void {
  }
  public irA(lugar){
    console.log(lugar);
    switch (lugar) {
      case 'diccionario':
        this.diccionario.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});    
        break;
      case 'proyectos':
        this.proyectos.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});    
        break;
      case 'bibliotecas':
        this.biblioteca.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});    
        break;
      case 'revistas':
        this.revistas.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});    
        break;
      case 'artes':
        this.artes.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});    
        break;
      default:
        break;
    }
    
  }
}
