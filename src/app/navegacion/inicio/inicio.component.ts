import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public mostrarLeerMas=false;
  public vLeerMas=false;
  public vIsotipo=false;
  public tLeerMas='Leer más';
  constructor() { }

  ngOnInit(): void {
  }

  public acLeerMas(){
    this.vLeerMas=!this.vLeerMas;
    this.tLeerMas=this.vLeerMas?'Leer menos':'Leer más';
  }
  
  public abrirIsotipo(){
    this.vIsotipo=true;
  }

  public cerrarIsotipo(){
    this.vIsotipo=false;
  }
}
