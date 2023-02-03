import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {

  	constructor() { }

  	validateTime(x){
      if(parseInt(x.substring(0,2))>=12){
        if((parseInt(x.substring(0,2))>=13)&&(parseInt(x.substring(0,2))<=24)){
          x = '0'+(parseInt(x.substring(0,2))-12).toString()+x.substring(2,5)+' PM'
        }
        else{
          x = (12).toString()+x.substring(2,5)+' PM'
        }
      }
      else if(parseInt(x.substring(0,2))==0){
        x = (12).toString()+x.substring(2,5) +' PM'
      }
      else
        return x+' AM'

      return x;
    }

    test(){
    	return 'xxx'
    }
}
