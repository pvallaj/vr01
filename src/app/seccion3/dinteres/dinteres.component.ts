
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dinteres',
  styleUrls: ['./dinteres.component.css'],
  templateUrl: './dinteres.component.html',
})
export class DInteresComponent implements OnInit {
  /******************************************************************************************
  DESCRIPCIÓN:
  Muestra la secciòn de enlaces de interes.
  ******************************************************************************************/
  @Input() public tipo = 'detalle';

  @ViewChild('diccionario') public diccionario: any;
  @ViewChild('proyectos') public proyectos: any;
  @ViewChild('bibliotecas') public biblioteca: any;
  @ViewChild('revistas') public revistas: any;
  @ViewChild('artes') public artes: any;

  constructor() { }

  public ngOnInit(): void {
  }
  public irA(lugar) {
    /******************************************************************************************
    DESCRIPCIÓN:
      hace un salta a la sección indicada
    PARAMETROS:
      lugar. Es el punto de la pagina a la que se desea saltar.
    RESULTADO:
      Ninguno.
    ******************************************************************************************/
    console.log(lugar);
    switch (lugar) {
      case 'diccionario':
        this.diccionario.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'proyectos':
        this.proyectos.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'bibliotecas':
        this.biblioteca.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'revistas':
        this.revistas.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      case 'artes':
        this.artes.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        break;
      default:
        break;
    }

  }
}
