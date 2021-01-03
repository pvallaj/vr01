import { Injectable } from '@angular/core';
//import * as FileSaver from 'file-saver';

export class UtilS {

	fechaACadena(f):string{
      return f.year+'-'+(f.month<=9?("0"+f.month):f.month)+'-'+(f.day<=9?("0"+f.day):f.day);
    }
    DateACadena(f:Date):string{
      let resp:string=''; 
    	try{
    		resp=(f.getDate()<=9?("0"+f.getDate()):f.getDate())+'-'+
		      (f.getMonth()<9?("0"+(f.getMonth()+1)):(f.getMonth()+1))+"-"+
		      f.getFullYear();
    	}catch(e){
    		resp= '';
    	}
    	return resp;
    }
    DateACadenaSQL(f:Date):string{
    	let resp:string='';
    	try{
    		resp=f.getFullYear()+"-"+
      			(f.getMonth()<9?("0"+(f.getMonth()+1)):(f.getMonth()+1))+'-'+
      			(f.getDate()<=9?("0"+f.getDate()):f.getDate());
    	}catch(e){
    		resp= 'null';
    	}
      return resp;
    }
    /**
	 * Convierte una cadena a un objeto Date
	 * @param {string} f 
	 * @return {Date} fecha
	 */
    CadenaADate(f:string){
    	
    	var anios:number=+(f.substring(6,10)) ;
    	var mes:number=+(f.substring(3,5));
    	var dia:number=+(f.substring(0,2));
    	//console.log(anios, mes, dia)
    	return new Date(anios,mes-1,dia);
    }
    horaACadena(h){
    	return (h.hour<=9?("0"+h.hour):h.hour)+':'+(h.minute<=9?("0"+h.minute):h.minute)
    }




}