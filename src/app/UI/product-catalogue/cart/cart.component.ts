import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalComponent } from 'src/app/UI/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   cartItems = [] as any;
   cartTotal = 0;
  constructor(private msgService : MessengerService, private cookieService: CookieService ,   private router: Router,  private dialog: MatDialog,) { 
    this.cartItems.length =0;
  }

  ngOnInit()  {
   
    if(this.cookieService.get('cart') != ""){
      this.cartItems = JSON.parse(this.cookieService.get('cart'))
    }
    if(this.cookieService.get('cartTotal') != ""){
      this.cartTotal = JSON.parse(this.cookieService.get('cartTotal'))
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
      price:product.productPrice
    })
  
    this.recalculateTotalPrice()
    this.cookieService.set('cart', JSON.stringify(this.cartItems))
  }


}

 
 removeItem(id:string){
  this.cartItems = this.cartItems.filter((item:any) => item.id !== id);
  this.cookieService.delete('cart');
  this.cookieService.set('cart', JSON.stringify(this.cartItems))
  this.recalculateTotalPrice()
  
}

recalculateTotalPrice(){
  this.cartTotal=0
  this.cartItems.forEach((item:any)=>{
  this.cartTotal  += (item.qty * (item.price*(100-(item.discount))/100))
  this.cookieService.delete('cartTotal');
  this.cookieService.set('cartTotal', JSON.stringify(this.cartTotal))
})
}

clearCart(){
  this.cartItems = []
  this.cookieService.delete('cart');
}


openDialogIfNotLoggedIn(): void {
  if(localStorage.getItem('token') != null){
    this.router.navigate(['/productsetup'])
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
