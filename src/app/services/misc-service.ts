import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../classes/product';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from '../classes/productBrand';
import { environment } from 'src/environments/environment'


@Injectable({
    providedIn: 'root'
  })
  

  export class MiscService {
      
    nodeServer:string;
    httpOptions:any;
    returnData:any;
    private API_URL= environment.API_URL
   
  
   public constructor(private httpClient: HttpClient) { 
    this.nodeServer = this.API_URL; 
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };


  }

  sendEmail(postData:string) {
    return this.httpClient.post((this.nodeServer + "/" + "sendEmail/" ), postData, this.httpOptions);
  }
}