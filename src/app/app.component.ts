import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CanalService } from './servicios/canal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class AppComponent {
  title = 'texlit';
  showFiller = false;

  public txtbuscar:string;
  public bexacta=true;
  public vIsotipo=false;
  public vCreditos=false;
  constructor(public r:Router, private cc:CanalService) { 
    
  }

  public buscarTermino(){
    /*****************************************************************************************
      Descripción
        El usuario ha presionado ENTER en la caja de buscar o ha dado  
        CLICK en el botón "BUSCAR", lo que indica que desea hacer una consulta.
      Parametros
          
      Resultado
          
    ******************************************************************************************/
    this.cc.terminoConsulta=this.txtbuscar;
    

      this.cc.sendMessage(this.txtbuscar);

    this.r.navigate(['/buscar']);
  }

}
