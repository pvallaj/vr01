import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-ftgaleria',
  templateUrl: './ftgaleria.component.html',
  styleUrls: ['./ftgaleria.component.css']
})
export class FTGaleriaComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit(): void {
      this.galleryOptions = [
        {
            width: '1200px',
            height: '700px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            previewCloseOnClick:true,
            previewDescription:true
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        // max-width 400
        {
            breakpoint: 400,
            preview: false
        }
    ];
    this.galleryImages = [
      {
          small: 'assets/fotos/img01.jpg',
          medium: 'assets/fotos/img01.jpg',
          big: 'assets/fotos/img01.jpg', 
          description:'Foto1. Descripción de la foto 1, datos importantes o alguna reseña'
      },
      {
          small: 'assets/fotos/img02.jpg',
          medium: 'assets/fotos/img02.jpg',
          big: 'assets/fotos/img02.jpg',
          description:'Foto1. Descripción de la foto 2, datos importantes o alguna reseña'
      },
      {
          small: 'assets/fotos/img03.jpg',
          medium: 'assets/fotos/img03.jpg',
          big: 'assets/fotos/img03.jpg',
          description:'Foto1. Descripción de la foto 3, datos importantes o alguna reseña'
      },
      {
        small: 'assets/fotos/img04.jpg',
        medium: 'assets/fotos/img04.jpg',
        big: 'assets/fotos/img04.jpg', 
        description:'Foto1. Descripción de la foto 1, datos importantes o alguna reseña'
    },
    {
        small: 'assets/fotos/img05.jpg',
        medium: 'assets/fotos/img05.jpg',
        big: 'assets/fotos/img05.jpg',
        description:'Foto1. Descripción de la foto 2, datos importantes o alguna reseña'
    },
    {
        small: 'assets/fotos/img06.jpg',
        medium: 'assets/fotos/img06.jpg',
        big: 'assets/fotos/img06.jpg',
        description:'Foto1. Descripción de la foto 3, datos importantes o alguna reseña'
    }
  ];
  }

}
