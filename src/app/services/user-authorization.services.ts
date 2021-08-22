import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  })
}



@Injectable({
  providedIn: 'root'
})


export class UserAuthService {
  private API_URL = environment.API_URL
  nodeServer: string;
  constructor(private httpClient: HttpClient) {
    this.nodeServer = this.API_URL;
  }
  getUserAuthoriation(userId: string) {
    return this.httpClient.get(this.API_URL + "/" + "userAuthorization/" + userId);
  }
  addUserAuthorization(userId: string, postData: any) {
    return this.httpClient.post((this.API_URL + "/" + "userAuthorization/" + userId), JSON.stringify(postData), httpOptions);
  }
}



