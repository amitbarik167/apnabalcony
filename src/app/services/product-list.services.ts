import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../classes/product';



@Injectable({
  providedIn: 'root'
})


export class ProductListService {

  nodeServer:string;
  httpOptions:any;
  httpOptionsMultiFormData:any;
  returnData:any;
 

 public constructor(private httpClient: HttpClient) { 
    this.nodeServer = 'http://localhost:3000';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' +localStorage.getItem('token')  + ' ' + localStorage.getItem('authorizationToken')
      })
    };

    this.httpOptionsMultiFormData ={
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('authorizationToken')
      })
    }

  }


  

  //#region  Product

  getProducts():Observable<Product[]> {
    return  <Observable<Product[]>> this.httpClient.get<Product[]>(this.nodeServer + "/" + "products",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' +localStorage.getItem('token')  + ' ' + localStorage.getItem('authorizationToken')
      })
    });
     
  }
  addProduct(postData:string, productCode:string) {
    return this.httpClient.post((this.nodeServer + "/" + "product/" + productCode), postData,this.httpOptionsMultiFormData);
  }

  updateProduct(postData:string, id:string) {
    return this.httpClient.put((this.nodeServer + "/" + "product/" + id), postData, this.httpOptions);
  }
  deleteProduct(id: string) {
    return this.httpClient.delete((this.nodeServer + "/" + "product/" + id), this.httpOptionsMultiFormData);
  }

}



