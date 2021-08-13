import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../classes/product';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from '../classes/productBrand';



@Injectable({
  providedIn: 'root'
})


export class ProductListService {

  nodeServer:string;
  httpOptions:any;
  httpOptionsMultiFormData:any;
  returnData:any;
 

 public constructor(private httpClient: HttpClient) { 
  //this.nodeServer = 'http://localhost:3000' //Use this when running locally
    this.nodeServer = 'https://apnabalconyapi.azurewebsites.net'; // use this when deploying to Azure App service
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
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
    return  <Observable<Product[]>> this.httpClient.get<Product[]>(this.nodeServer + "/" + "products/all")
    };
     
   
       


  searchProducts(postData:string) :Observable<Product[]>{
    return  <Observable<Product[]>> this.httpClient.put<Product[]>(this.nodeServer + "/" + "products",postData)
  };

  searchProductsDirectly(postData:string){
  return this.httpClient.put<Product[]>(this.nodeServer + "/" + "products",postData)
  }

   
  getProductBrands():Observable<ProductBrand[]> {
    return this.httpClient.get<ProductBrand[]>(this.nodeServer + "/" + "productsList/productBrands")
    };

     //#region Product Category
  getProductCategories() {
    return this.httpClient.get(this.nodeServer + "/" + "productsList/productCategories",this.httpOptions);
  }

   getProductSubCategories():Observable<ProductSubCategory[]> {
     
     return this.returnData =  this.httpClient.get<ProductSubCategory[]>(this.nodeServer + "/" + "productsList/productSubCategories");
      
  }

    //#region  Product Color

    getProductColors() {
      return this.httpClient.get(this.nodeServer + "/" + "productsList/productColors");
    }
  
     

}



