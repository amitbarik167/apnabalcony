import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../classes/product';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from '../classes/productBrand';


@Injectable({
    providedIn: 'root'
  })
  

  export class MiscService {
      
    nodeServer:string;
    httpOptions:any;
    returnData:any;
   
  
   public constructor(private httpClient: HttpClient) { 
  //  this.nodeServer = 'http://localhost:3000' //Use this when running locally
   this.nodeServer = 'https://apnabalconyapi.azurewebsites.net'; // use this when deploying to Azure App service
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