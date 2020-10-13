import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SesionUsuario } from '../../servicios/SesionUsuario.service';

@Component({
  selector: 'app-lts-noticias',
  templateUrl: './lts-noticias.component.html',
  styleUrls: ['./lts-noticias.component.css']
})
export class LtsNoticiasComponent implements OnInit {

  constructor(private sus:SesionUsuario, private ru:Router) { }

  ngOnInit(): void {
    if(this.sus.getEstadoSesion()=='desconectado'){
      this.ru.navigate(['registro']);
    }
  }

}
