import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product
  cartItems = [] as any;
  cartTotal = 0;
  constructor(private msgService: MessengerService, private router: Router,) 
  {
    this.cartItems.length = 0;
   }

  ngOnInit(): void {
    
    if (localStorage.getItem('cart') != "") {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || "[]")
    }
    if (localStorage.getItem('cartTotal') != "") {
      this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') || "[]")
    }
    this.msgService.getCartDetails().subscribe((product: any) => {
      this.addProductToCart(product)
    })

  }

  handleAddToCart() {
    this.msgService.sendCartDetails(this.productItem)
    this.msgService.sendCartItemsForQtyDisplay(this.productItem)
  }

  itemDetails(_id: string) {
    this.router.navigate(['/productitemdetails', { productId: _id }]);
  }

  addProductToCart(product: any) {

    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].id === product._id) {
        this.cartItems[i].qty++
        productExists = true
        this.recalculateTotalPrice()
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        return;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        id: product._id,
        discount: product.productDiscount,
        productName: product.productName,
        qty: 1,
        price: product.productPrice,
        productImg: product.productImg
      })

      this.recalculateTotalPrice()
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    }
  }

  recalculateTotalPrice() {
    this.cartTotal = 0
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * (item.price * (100 - (item.discount)) / 100))
      localStorage.removeItem('cartTotal');
      localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal))
    })
  }

}
