import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Template } from '../classes/template';
import { environment } from 'src/environments/environment'



@Injectable({
  providedIn: 'root'
})


export class TemplateListService {
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

  getTemplates(): Observable<Template[]> {
    return <Observable<Template[]>>this.httpClient.get<Template[]>(this.nodeServer + "/" + "templateAllCart")
  };

  searchTemplates(postData: string): Observable<Template[]> {
    return <Observable<Template[]>>this.httpClient.put<Template[]>(this.nodeServer + "/" + "templates", postData)
  };

  searchProductsDirectly(postData: string) {
    return this.httpClient.put<Template[]>(this.nodeServer + "/" + "templates", postData)
  }

  getTemplateImagesByTemplateId(templateId: string) {
    return this.httpClient.get(this.nodeServer + "/" + "templateImages/cart/" + templateId);
  }


}



