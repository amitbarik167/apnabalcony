import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from '../classes/productBrand';
import { environment } from 'src/environments/environment'



@Injectable({
  providedIn: 'root'
})


export class ProductListService {
  nodeServer: string;
  httpOptions: any;
  returnData: any;
  private API_URL = environment.API_URL


  public constructor(private httpClient: HttpClient) {
    this.nodeServer = this.API_URL;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

  }




  //#region  Product

  getProducts(): Observable<Product[]> {
    return <Observable<Product[]>>this.httpClient.get<Product[]>(this.nodeServer + "/" + "products/all")
  };

  searchProducts(postData: string): Observable<Product[]> {
    return <Observable<Product[]>>this.httpClient.put<Product[]>(this.nodeServer + "/" + "products", postData)
  };

  searchProductsDirectly(postData: string) {
    return this.httpClient.put<Product[]>(this.nodeServer + "/" + "products", postData)
  }


  getProductBrands(): Observable<ProductBrand[]> {
    return this.httpClient.get<ProductBrand[]>(this.nodeServer + "/" + "productsList/productBrands")
  };

  //#region Product Category
  getProductCategories() {
    return this.httpClient.get(this.nodeServer + "/" + "productsList/productCategories", this.httpOptions);
  }

  getProductSubCategories(): Observable<ProductSubCategory[]> {

    return this.returnData = this.httpClient.get<ProductSubCategory[]>(this.nodeServer + "/" + "productsList/productSubCategories");

  }

  //#region  Product Color

  getProductColors() {
    return this.httpClient.get(this.nodeServer + "/" + "productsList/productColors");
  }


  getProductImagesByProductId(productId: string) {
    return this.httpClient.get(this.nodeServer + "/" + "productImages/all/" + productId);
  }


}



