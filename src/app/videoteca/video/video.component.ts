import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videos:any[]=[
    {
      titulo:"México: cultura novohispana",
      subtitulo:"Video sobre la cultura novohispana; editado con fines didácticos para el proyecto Sec'21, a partir de un programa de Telesecundaria.",
      url:"https://www.youtube.com/embed/XBSJTZTxkyA"
    },
    {
      titulo:"LA SOCIEDAD NOVOHISPANA",
      subtitulo:"descripción",
      url:"https://www.youtube.com/embed/NxMrLHbOac0"
    },
    {
      titulo:"Así vivían los Mexicanos después de la Independencia - Sinueton",
      subtitulo:"¿Sabes cómo vivía la \"gente común\" en México después de la Guerra de Independencia? Bueno, no fue lo que esperaban.",
      url:"https://www.youtube.com/embed/FpUGPuUJF0w"
    },
    {
      titulo:"Arquitectura Novohispana",
      subtitulo:"México es rico en patrimonio cultural de la época novohispana, por lo que es necesario conocer los estilos arquitectónicos para aproximarse al turismo cultural y religioso.",
      url:"https://www.youtube.com/embed/v0-kNBY-1R8"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
