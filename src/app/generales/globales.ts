export class Globales{
    /*****************************************************************************************
    Define variables globales, hasta el momento, se definen las siguientes:

    servidor_api. Define la ruta del servidor de servicios, es decir, la ubicación de los componentes PHP
                  que ejecutarán las peticiones de los clientes.
    rutaImgNoticias. Define la ruta donde se almacenarán las imágenes que el usuario desea colocar en cada
                  noticia. Es importante que esta ruta tenga privilegios de escritura definidos para el
                  usuario de los procesos de apache.

******************************************************************************************/
    // Producción
    // public static servidor_api = 'https://www.iifl.unam.mx/hlmnovohispana/api/index.php'; // servidor HLM produccion
    // public static rutaImgNoticias = 'api/img_noticias'; // servidor

    // Desarrollo
     public static servidor_api='/api';
     public static rutaImgNoticias='http://localhost:8000/img_noticias/';
}
