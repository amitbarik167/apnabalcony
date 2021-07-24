import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   cartItems = [] as any;
   cartTotal = 0;
  constructor(private msg : MessengerService) { 
    this.cartItems.length =0;
  }

  ngOnInit()  {
  
    this.msg.getMsg().subscribe((product: any) => {
    this.addProductToCart(product)
     
  })

 }

 addProductToCart(product:any){
  
       this.cartItems.push({
         id: product._id,
         discount: product.productDiscount,
         productName : product.productName,
         qty:1,
         price:product.productPrice
       })
     
  
   
  this.cartTotal=0
  this.cartItems.forEach((item:any)=>{
  this.cartTotal  += (item.qty * item.price)
  this.cartTotal = this.cartTotal - (this.cartTotal*item.discount/100)

})

 }
}
