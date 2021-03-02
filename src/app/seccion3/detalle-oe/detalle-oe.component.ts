import { Component, OnInit, Input } from '@angular/core';
import { CanalService } from '../../servicios/canal.service';

@Component({
  selector: 'app-detalle-oe',
  templateUrl: './detalle-oe.component.html',
  styleUrls: ['./detalle-oe.component.css']
})
export class DetalleOEComponent implements OnInit {
  @Input() elemento:any;
  @Input() tipo:number=1; //1.- Detalle completo, 2.- Detalle resumido
  public termino:string;
  constructor(private cs:CanalService) { 
    if(cs.terminoConsulta){
      this.termino=cs.terminoConsulta;
    }
  }

  ngOnInit(): void {

  }

  recorta(termino:string, texto:string, largo:number):string{
    if(texto.indexOf(termino)>=0 && texto.indexOf(termino)>largo){
      let pt=texto.indexOf(termino)
      let inicio=pt-largo/2+(texto.indexOf(' ', pt-largo/2)-(pt-largo/2));
      let fin=texto.indexOf(' ',inicio+largo);
      if(fin==-1){
        return '...'+texto.substring(inicio)
      }
      return '...'+texto.substring(inicio, fin) + '...';
    }else{
      if (texto.length > largo) {
        return texto.substring(0, texto.indexOf(' ', largo)) + '...';
      }

    }
    return texto;
  }

  public mostrarTexto=true;
  ocultarTexto(){
    this.mostrarTexto=!this.mostrarTexto;
  }
}
