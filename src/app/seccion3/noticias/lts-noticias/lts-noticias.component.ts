import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../servicios/Conexion.service';

@Component({
  selector: 'app-lts-noticias',
  templateUrl: './lts-noticias.component.html',
  styleUrls: ['./lts-noticias.component.css']
})
export class LtsNoticiasComponent implements OnInit {
  public listaNoticias:any[]=[];
  constructor(private cnx:ConexionService) {
    
   }

  ngOnInit(): void {
  }

}
