export class UtilS {
/******************************************************************************************
  DESCRIPCIÓN:
    Contiene funciones de genericas.
******************************************************************************************/

  public fechaACadena(f): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Convierte un objeto de tipo fecha a una cadena con el formato yyyy-mm-dd.
      Este cambio se realiza para que las funciones de base de datos la puedan interpretar directamente.
    PARAMETROS:
      f. Es el objeto de tipo fecha.
    RESULTADO:
      una cadena con la fecha en el formato yyyy-mm-dd
    ******************************************************************************************/
      return f.year + '-' + (f.month <= 9 ? ('0' + f.month) : f.month) + '-' + (f.day <= 9 ? ('0' + f.day) : f.day);
  }

  public DateACadena(f: Date): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Convierte un objeto de tipo Date a una cadena con el formato dd-mm-yyyy.
      Este cambio se realiza para que las funciones de base de datos la puedan interpretar directamente.
    PARAMETROS:
      f. Es el objeto de tipo fecha.
    RESULTADO:
      una cadena con la fecha en el formato dd-mm-yyyy
    ******************************************************************************************/
    let resp = '';
    try {
      resp = (f.getDate() <= 9 ? ('0' + f.getDate()) : f.getDate()) + '-' +
        (f.getMonth() < 9 ? ('0' + (f.getMonth() + 1)) : (f.getMonth() + 1)) + '-' +
        f.getFullYear();
    } catch (e) {
      resp = '';
    }
    return resp;
  }

  public DateACadenaSQL(f: Date): string {
    /******************************************************************************************
    DESCRIPCIÓN:
      Convierte un objeto de tipo fecha a una cadena con el formato yyyy-mm-dd.
      Este cambio se realiza para que las funciones de base de datos la puedan interpretar directamente.
    PARAMETROS:
      f. Es el objeto de tipo fecha.
    RESULTADO:
      una cadena con la fecha en el formato yyyy-mm-dd
    ******************************************************************************************/
    let resp = '';
    try {
      resp = f.getFullYear() + '-' +
          (f.getMonth() < 9 ? ('0' + (f.getMonth() + 1)) : (f.getMonth() + 1)) + '-' +
          (f.getDate() <= 9 ? ('0' + f.getDate()) : f.getDate());
    } catch (e) {
      resp = 'null';
    }
    return resp;
  }

  public CadenaADate(f: string) {
    /******************************************************************************************
    DESCRIPCIÓN:
      Convierte una cadena con formato dd-mm-yyyy a un objeto de tipo Date.
    PARAMETROS:
      Una cadena con una fecha en el formato dd-mm-yyyy
    RESULTADO:
      Un objeto de tipo fecha, con la fecha especificcada.
    ******************************************************************************************/
    const anios: number = +(f.substring(6, 10)) ;
    const mes: number = +(f.substring(3, 5));
    const dia: number = +(f.substring(0, 2));
    // console.log(anios, mes, dia)
    return new Date(anios, mes - 1, dia);
  }

  public horaACadena(h) {
    return (h.hour <= 9 ? ('0' + h.hour) : h.hour) + ':' + (h.minute <= 9 ? ('0' + h.minute) : h.minute);
  }

}
