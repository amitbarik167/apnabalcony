import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ProductListService } from 'src/app/services/product-list.services';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

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

  constructor(private productService: ProductListService, private route: ActivatedRoute, private msgService: MessengerService) { }

  ngOnInit(): void {

    this.product = new Product();
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.product._id = this.productId;
    this.productService.searchProducts(this.product).subscribe(res => { this.productList = res; });;
    this.productService.getProductImagesByProductId(this.productId).subscribe(res => { this.imagesList = res })

  }

  handleAddToCart(productItem: any) {
    this.msgService.sendCartDetails(productItem)
    this.msgService.sendCartItemsForQtyDisplay(productItem)
  }


}
