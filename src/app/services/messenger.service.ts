import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subjectCartItems = new Subject();
  subjectSearchItems = new Subject();

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
 
}
