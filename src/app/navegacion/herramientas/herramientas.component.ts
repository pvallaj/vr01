import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  constructor(private r:Router) { }

  ngOnInit(): void {
    console.log(this.r.url);
  }

  public irASermones(){
    this.r.navigate(['sermones']);
  }

  public irARelaciones(){
    this.r.navigate(['relaciones']);
  }

}
