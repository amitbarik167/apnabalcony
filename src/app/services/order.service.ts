import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'



@Injectable({
  providedIn: 'root'
})


export class OrderService {
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


  addOrder(postData: string): Observable<any> {

    return this.httpClient.post((this.nodeServer + "/" + "orderCreate/" ), postData, this.httpOptions);
  }

  addOrderItems(postData: string) {

    return this.httpClient.post((this.nodeServer + "/" + "orderItemsCreate/" ), postData, this.httpOptions);
  }

  addOrderCustomerAddress(postData: string) {

    return this.httpClient.post((this.nodeServer + "/" + "orderCustomerAddressCreate/" ), postData, this.httpOptions);
  }

  getAllOrders(){
    return this.httpClient.get((this.nodeServer + "/" + "orderAll"),this.httpOptions)
  }

  getOrderByOrderNo(orderNo:string){
    return this.httpClient.get((this.nodeServer + "/" + "orderFind/"+ orderNo))

  }

  updateOrder(postData: string, id: string) {

    return this.httpClient.put((this.nodeServer + "/" + "orderUpdate/" + id), postData, this.httpOptions);
  }

  getOrderItemsByOrderId(orderId:string){
    return this.httpClient.get((this.nodeServer + "/" + "orderItems/" + orderId),this.httpOptions)
  }
  getCustomerDetailsByOrderId(orderId:string){
    return this.httpClient.get((this.nodeServer + "/" + "orderCustomerAddress/" + orderId),this.httpOptions)
  }

}



