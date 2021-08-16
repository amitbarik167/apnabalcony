import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalComponent } from 'src/app/UI/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductListService } from 'src/app/services/product-list.services';

import { Router, Routes } from '@angular/router';
import { timestamp } from 'rxjs/operators';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   cartItems = [] as any;
   cartTotal = 0;
   productList =[] as any;
   product:any;
   filteredProduct:any;
  constructor(private msgService : MessengerService, private cookieService: CookieService ,   private router: Router,  private dialog: MatDialog,private productListSrvice : ProductListService) { 
    this.cartItems.length =0;
  }

  ngOnInit()  {
     
    if(localStorage.getItem('cart') != ""){
      this.cartItems = JSON.parse(localStorage.getItem('cart')||"[]")
    }
    if(localStorage.getItem('cartTotal') != ""){
      this.cartTotal = JSON.parse(localStorage.getItem('cartTotal')||"[]")
    }
    
    this.msgService.getCartDetails().subscribe((product: any) => {
    this.addProductToCart(product)
  })
 }

 addProductToCart(product:any){

  let productExists = false

  for (let i in this.cartItems){
    if(this.cartItems[i].id === product._id){
      this.cartItems[i].qty++
      productExists=true
      this.recalculateTotalPrice()
      break;
    }
  }

  if(!productExists){
    this.cartItems.push({
      id: product._id,
      discount: product.productDiscount,
      productName : product.productName,
      qty:1,
      price:product.productPrice,
      productImg:product.productImg
    })
  
    this.recalculateTotalPrice()
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
  }


}

 
 removeItem(id:string){
  this.cartItems = this.cartItems.filter((item:any) => item.id !== id);
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(this.cartItems))
  this.recalculateTotalPrice()

  this.msgService.sendRemoveItemFromCart(id)
  
}

recalculateTotalPrice(){
  this.cartTotal=0
  this.cartItems.forEach((item:any)=>{
  this.cartTotal  += (item.qty * (item.price*(100-(item.discount))/100))
  localStorage.removeItem('cartTotal');
  localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal))
})
}

clearCart(){
  this.cartItems = []
  localStorage.removeItem('cart');
  this.msgService.sendClearItemsFromCart();
}


openDialogIfNotLoggedIn(): void {
  if(this.cookieService.get('token') != ""){
  }
  else{
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
     
    });
  }
}
}
