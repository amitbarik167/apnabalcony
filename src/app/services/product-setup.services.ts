import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from '../classes/productBrand';
import {Product} from '../classes/product';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})


export class ProductSetupService {

  nodeServer:string;
  httpOptions:any;
  httpOptionsMultiFormData:any;
  returnData:any;
 

 public constructor(private httpClient: HttpClient,  private cookieService: CookieService,) { 
     // this.nodeServer = 'http://localhost:3000' //Use this when running locally
    this.nodeServer = 'https://apnabalconyapi.azurewebsites.net'; // use this when deploying to Azure App service
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + this.cookieService.get('token')  + ' ' + this.cookieService.get('authorizationToken')
      })
    };

    this.httpOptionsMultiFormData ={
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this.cookieService.get('token') + ' ' + this.cookieService.get('authorizationToken')
      })
    }

  }


  //#region Product Category
  getProductCategories() {
    
    return this.httpClient.get(this.nodeServer + "/" + "productCategories",this.httpOptions);
  }

  addProductCategory(postData:string, productCategoryCode:string) {
   
    return this.httpClient.post((this.nodeServer + "/" + "productCategory/" + productCategoryCode), postData, this.httpOptions);
  }

  updateProductCategory(postData:string, id:string) {
    
    return this.httpClient.put((this.nodeServer + "/" + "productCategory/" + id), postData, this.httpOptions);
  }
  deleteProductCategory(id: string) {
    
    return this.httpClient.delete((this.nodeServer + "/" + "productCategory/" + id), this.httpOptions);
  }

  //#endregion

  //#region  Product SubCategory

  getProductSubCategories():Observable<ProductSubCategory[]> {
     
    try {
      this.returnData =  this.httpClient.get<ProductSubCategory[]>(this.nodeServer + "/" + "productSubCategories",{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' +this.cookieService.get('token')  + ' ' + this.cookieService.get('authorizationToken')
        })
      });
    } catch (error) {

      console.log(error);
      
    }
    return this.returnData;
    
     
  }

  addProductSubCategory(postData:string, productSubCategoryCode:string) {
    return this.httpClient.post((this.nodeServer + "/" + "productSubCategory/" + productSubCategoryCode), postData, this.httpOptions);
  }

  updateProductSubCategory(postData:string, id:string) {
    return this.httpClient.put((this.nodeServer + "/" + "productSubCategory/" + id), postData, this.httpOptions);
  }
  deleteProductSubCategory(id: string) {
    return this.httpClient.delete((this.nodeServer + "/" + "productSubCategory/" + id), this.httpOptions);
  }

  getProductSubCategoriesByProductCategoryId(id:string) {
    return this.httpClient.get(this.nodeServer + "/" + "productSubCategories",this.httpOptions);
  }


  //#endregion




  //#region  Product Color

  getProductColors() {
    return this.httpClient.get(this.nodeServer + "/" + "productColors",this.httpOptionsMultiFormData);
  }

  addProductColor(postData:string, productColorCode:string) {
    return this.httpClient.post((this.nodeServer + "/" + "productColor/" + productColorCode), postData,this.httpOptionsMultiFormData);
  }

  updateProductColor(postData:string, id:string) {
    return this.httpClient.put((this.nodeServer + "/" + "productColor/" + id), postData, this.httpOptions);
  }
  deleteProductColor(id: string) {
    return this.httpClient.delete((this.nodeServer + "/" + "productColor/" + id), this.httpOptionsMultiFormData);
  }

  //#endregion


   //#region  Product Brand

  
  getProductBrands():Observable<ProductBrand[]> {
    return this.httpClient.get<ProductBrand[]>(this.nodeServer + "/" + "productBrands",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' +this.cookieService.get('token')  + ' ' + this.cookieService.get('authorizationToken')
      })
    });
     
  }

  addProductBrand(postData:string, productBrandCode:string) {
    return this.httpClient.post((this.nodeServer + "/" + "productBrand/" + productBrandCode), postData,this.httpOptionsMultiFormData);
  }

  updateProductBrand(postData:string, id:string) {
    return this.httpClient.put((this.nodeServer + "/" + "productBrand/" + id), postData, this.httpOptions);
  }
  deleteProductBrand(id: string) {
    return this.httpClient.delete((this.nodeServer + "/" + "productBrand/" + id), this.httpOptionsMultiFormData);
  }

  //#endregion

  //#region  Product

  getProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.nodeServer + "/" + "products",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' +this.cookieService.get('token')  + ' ' + this.cookieService.get('authorizationToken')
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



