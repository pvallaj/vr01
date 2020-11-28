import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import { ConexionService } from '../../servicios/Conexion.service';
import { MatDialog } from '@angular/material/dialog';

export interface Parametros {
  nombre: string;
  descripcion: string;
}

export interface Narrativa {
  autor: string;
  narratio: string;
  id_texto: number;
  obra: string;
  nombre: string;
  ubicacion: string;
}
@Component({
  selector: 'app-cons-det-narrativa',
  templateUrl: './cons-det-narrativa.component.html',
  styleUrls: ['./cons-det-narrativa.component.css']
})
export class ConsDetNarrativaComponent implements OnInit, OnChanges {

  @Input() public idTexto = 0;
  @Input() public narrativa: Narrativa = null;
  @Input() public textoBuscado: "";

  public bibliografia: any = [];
  public princeps: any = [];
  public contexto: any = [];
  public tipoAccion: any = [];
  public clasificacion: any = [];
  public motivos: any = [];
  public tema: any = [];
  public versificacion: any = [];
  public soporte: any = [];
  public signos: any = [];
  public vinculos: any = [];

  public estaCargando = false;
  public tabSeleccionado = 0;
  
  constructor(
    private cnx: ConexionService,
    public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.tabSeleccionado=0;
  }
  
  ngOnChanges(changes) {
    console.log('Cambio de narrativa');
    console.log(changes);
    if(this.idTexto === 0 ) {
      console.log("Regresando a valores iniciales");
      this.bibliografia = [];
      return;
    }

    //consultando detalle del sermon
    this.cnx.narrativas({id_texto: this.idTexto}, 'consulta detalle narrativa')
    .subscribe(
      (data) => {
        const temp = data['resultado'];
        console.log(temp);
        this.bibliografia = temp.bibliograficos[0];
        this.princeps = temp.princeps[0];
        this.contexto = temp.contexto[0];
        this.tipoAccion = temp.tipoAccion;
        this.clasificacion = temp.clasificacion;
        this.motivos = temp.motivos;
        this.tema = temp.temas;
        this.versificacion = temp.versificacion;
        this.soporte = temp.soporte;
        this.signos = temp.signos[0];
        this.vinculos = temp.vinculos[0];
        this.tabSeleccionado=0;
      },
    (error) => {
        console.log('No se logro la conexión');
        console.error(error);
        this.estaCargando = false;
      },
    );
  }

  public crearTextoBiliografia(elmt:any){
    //, {{}}, {{elmt.}}, {{elmt.editor}}, {{elmt.editor}}, {{elmt.anio}} , {{elmt.obra_anfitrio}}
    
    let res=elmt.autor+", <i> "+ elmt.obra+"</i>";
    if(elmt.ed_paleo){
      res=res+", ed. "+elmt.ed_paleo;
    }
    if(elmt.director_cor){
      res=res+", coord. "+elmt.ed_paleo;
    }
    if(elmt.traductor){
      res=res+", trad. "+elmt.ed_paleo;
    }
    if(elmt.editor){
      res=res+", "+elmt.editor;
    }
    if(elmt.ciudad){
      res=res+", "+elmt.ciudad;
    }
    if(elmt.anio){
      res=res+", "+elmt.anio;
    }
    if(elmt.obra_anfitrion){
      res=res+", en "+elmt.obra_anfitrion;
    }
    if(elmt.tomo){
      res=res+", t. "+elmt.obra_anfitrion;
    }
    if(elmt.coleccion){
      res=res+", col. "+elmt.coleccion;
    }
    if(elmt.pp){
      res=res+", pp. "+elmt.pp;
    }
    return res;
  }
  public resalta(texto:string, args: string) {
    if(!args || args==="" || !texto || texto==="") return texto;
    

    if(args.indexOf("+")>0){
      let textos=args.split("+");
      textos.forEach(el => {
        var re = new RegExp(el, 'gi'); 
        texto=texto.replace(re, '<mark class="resaltado">$&</mark>');
      });
      return texto;
    }else{
      var re = new RegExp(args, 'gi'); 
      return texto.replace(re, '<mark class="resaltado">$&</mark>');
    }
    
  }
}
