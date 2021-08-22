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

  constructor(private msgService: MessengerService, private router: Router,) { }

  ngOnInit(): void {

  }

  handleAddToCart() {
    this.msgService.sendCartDetails(this.productItem)
    this.msgService.sendCartItemsForQtyDisplay(this.productItem)
  }

  itemDetails(_id: string) {
    this.router.navigate(['/productitemdetails', { productId: _id }]);
  }

}
