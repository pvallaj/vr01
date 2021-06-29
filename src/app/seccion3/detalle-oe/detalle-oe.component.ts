import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CanalService } from '../../servicios/canal.service';
import { ConexionService } from '../../servicios/Conexion.service';

@Component({
  selector: 'app-detalle-oe',
  templateUrl: './detalle-oe.component.html',
  styleUrls: ['./detalle-oe.component.css']
})
export class DetalleOEComponent implements OnInit {
  @Input() elemento:any;
  @Input() tipo:number=1; //1.- Detalle completo, 2.- Detalle resumido

  @Output() seleccionarCapitulo=new EventEmitter<number>();

  public termino:string;
  public estaCargando=false;
  public referencias=null;
  
  constructor(private cs:CanalService, private cnx:ConexionService) { 
    if(cs.terminoConsulta){
      this.termino=cs.terminoConsulta;
    }
    
  }

  ngOnInit(): void {
    if(this.tipo==2){
      //se obtienen las referencias de capitulos a los que pertenece el recurso.
      this.estaCargando = true;
      this.cnx.novohisp({id: this.elemento.id}, 'referencias recurso').subscribe(
        (datos) => {
          this.estaCargando = false;
          this.referencias = datos['resultado'];
      }, (error) => {
        console.log('error al cargar a los autores');
        console.log(error);
      });
    }

    console.log('*************************************************************');
    console.log(this.elemento);
    console.log(this.tipo);
    console.log('*************************************************************');
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

  public seleccionar(idc:number){
    this.seleccionarCapitulo.emit(idc);
  }

}
