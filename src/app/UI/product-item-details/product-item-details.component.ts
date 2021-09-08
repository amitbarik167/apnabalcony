import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ProductListService } from 'src/app/services/product-list.services';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss']
})
export class ProductItemDetailsComponent implements OnInit {
  productList: Product[] = [];
  product: any;
  productId: any;
  imagesList: any = [];
  progressbarValue = 100;
  curSec: number = 0;

  constructor(private productService: ProductListService, private route: ActivatedRoute, private msgService: MessengerService) {
    this.progressbarValue = 100;
   }

  ngOnInit(): void {

    this.product = new Product();
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.product._id = this.productId;
    this.productService.searchProducts(this.product).subscribe(res => { this.productList = res; });;
    this.productService.getProductImagesByProductId(this.productId).subscribe(res => { this.imagesList = res })
    this.progressBar(5);
  }

  handleAddToCart(productItem: any) {
    this.msgService.sendCartDetails(productItem)
    this.msgService.sendCartItemsForQtyDisplay(productItem)
  }

  private progressBar(val: any) {
    this.progressbarValue = 100;
    const time = val;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / time;
      this.curSec = sec;

      if (this.curSec === time) {
        sub.unsubscribe();
      }
    });

  }


}
