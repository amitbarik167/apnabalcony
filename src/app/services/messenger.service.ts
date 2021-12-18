import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../classes/product';
import { Template } from '../classes/template';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subjectCartItems = new Subject();
  subjectTemplateCartItems = new Subject();
  subjectSearchItems = new Subject();
  subjectTemplateSearchItems = new Subject();
  subjectCartQtyDisplay = new Subject();
  subjectTemplateCartQtyDisplay = new Subject();
  subjectRemoveItemFromCart = new Subject();
  subjectRemoveTemplateItemFromCart = new Subject();
  subjectClearItemsFromCart = new Subject();
  subjectClearSearchTextBox = new Subject();
  subjectTemplateScreenshotString = new Subject();

  constructor() { }

  sendCartDetails(product:Product){

    this.subjectCartItems.next(product);
  }
  sendTemplateCartDetails(template:Template){

    this.subjectTemplateCartItems.next(template);
  }

  sendSearchFilters(product:Product){

    this.subjectSearchItems.next(product);
  }


  getCartDetails(){
   return this.subjectCartItems.asObservable();
  }

  getTemplateCartDetails(){
    return this.subjectTemplateCartItems.asObservable();
   }
 

  getSearchFilters(){
    return this.subjectSearchItems.asObservable();
   }

   sendCartItemsForQtyDisplay(product:Product){

    this.subjectCartQtyDisplay.next(product);
 }

 sendTemplateCartItemsForQtyDisplay(template:Template){

  this.subjectTemplateCartQtyDisplay.next(template);
}
   getCartItemsForQtyDisplay(){
    return this.subjectCartQtyDisplay.asObservable();
   }

   getTemplateCartItemsForQtyDisplay(){
    return this.subjectTemplateCartQtyDisplay.asObservable();
   }


   sendRemoveProductItemFromCart(id:string){

    this.subjectRemoveItemFromCart.next(id)
   }
   
   sendRemoveTemplateItemFromCart(id:string){

    this.subjectRemoveTemplateItemFromCart.next(id)
   }

   getRemoveItemFromCart(){
     return this.subjectRemoveItemFromCart.asObservable();
   }
   getRemoveTemplateItemFromCart(){
    return this.subjectRemoveTemplateItemFromCart.asObservable();
  }


   sendClearItemsFromCart(){

    this.subjectClearItemsFromCart.next()
   }

   getClearItemFromCart(){
     return this.subjectClearItemsFromCart.asObservable();
   }

   sendClearProductSearch(){

    this.subjectClearSearchTextBox.next()
   }

   getClearProductSearch(){
     return this.subjectClearSearchTextBox.asObservable();
   }

   
  sendSearchTemplateFilters(template:Template){

    this.subjectTemplateSearchItems.next(template);
  }

  getSearchTemplateFilters(){
    return this.subjectTemplateSearchItems.asObservable();
   }

   sendTemplateScreenshotString(imageString: any){
     this.subjectTemplateScreenshotString.next(imageString)
   }
   getTemplateScreenshotString(){
     return this.subjectTemplateScreenshotString.asObservable();
   }
}
