import { Component, OnInit,Input } from '@angular/core';
import { Template } from 'src/app/classes/template';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss']
})
export class TemplateItemComponent implements OnInit {

  @Input() templateItem: Template
  cartItems = [] as any;
  cartTotal = 0;

  constructor(private msgService: MessengerService, private router: Router,) {
    this.cartItems.length = 0;
   }

  ngOnInit(): void {
    if (localStorage.getItem('cart') != "") {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || "[]")
    }
    if (localStorage.getItem('cartTotal') != "") {
      this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') || "[]")
    }
    this.msgService.getTemplateCartDetails().subscribe((template: any) => {
      this.addTemplateToCart(template)
    })
  }

  handleAddToCart() {
    this.msgService.sendTemplateCartDetails(this.templateItem)
    this.msgService.sendTemplateCartItemsForQtyDisplay(this.templateItem)
  }

  itemDetails(_id: string) {
    this.router.navigate(['/templateitemdetails', { templateId: _id }]);
  }

  addTemplateToCart(template: any) {

    let templateExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].templateId === template._id) {
        this.cartItems[i].qty++
        templateExists = true
        this.recalculateTotalPrice()
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        return;
      }
    }

    if (!templateExists) {
      this.cartItems.push({
        templateId: template._id,
        templateName: template.templateName,
        qty: 1,
        discount:0,
        price: template.templatePrice,
        templateImg: template.templateImg
      })

      this.recalculateTotalPrice()
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    }
  }

  recalculateTotalPrice() {
    this.cartTotal = 0
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * (item.price))
      localStorage.removeItem('cartTotal');
      localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal))
    })
  }


}
