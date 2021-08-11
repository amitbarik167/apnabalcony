import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subjectCartItems = new Subject();
  subjectSearchItems = new Subject();
  subjectCartQtyDisplay = new Subject();
  subjectRemoveItemFromCart = new Subject();
  subjectClearItemsFromCart = new Subject();

  constructor() { }

  sendCartDetails(product:Product){

    this.subjectCartItems.next(product);
  }

  sendSearchFilters(product:Product){

    this.subjectSearchItems.next(product);
  }


  getCartDetails(){
   return this.subjectCartItems.asObservable();
  }

  getSearchFilters(){
    return this.subjectSearchItems.asObservable();
   }

   sendCartItemsForQtyDisplay(product:Product){

    this.subjectCartQtyDisplay.next(product);
 }
   getCartItemsForQtyDisplay(){
    return this.subjectCartQtyDisplay.asObservable();
   }

   sendRemoveItemFromCart(id:string){

    this.subjectRemoveItemFromCart.next(id)
   }

   getRemoveItemFromCart(){
     return this.subjectRemoveItemFromCart.asObservable();
   }

   sendClearItemsFromCart(){

    this.subjectClearItemsFromCart.next()
   }

   getClearItemFromCart(){
     return this.subjectClearItemsFromCart.asObservable();
   }
}
