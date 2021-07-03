import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




const nodeServer = 'http://localhost:3000';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  })
}



@Injectable({
  providedIn: 'root'
})


export class UserAuthService {
  constructor(private httpClient: HttpClient ) { }
  getUserAuthoriation(userId:string) {
    return this.httpClient.get(nodeServer + "/" + "userAuthorization/" + userId);
  }
  addUserAuthorization(userId:string,postData:any) {
    return this.httpClient.post((nodeServer + "/" + "userAuthorization/"+ userId), JSON.stringify(postData), httpOptions);
  }
}



