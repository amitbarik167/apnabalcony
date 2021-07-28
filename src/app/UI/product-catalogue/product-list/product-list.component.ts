import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.services';
import { Product } from 'src/app/classes/product';
import { Observable } from 'rxjs';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList : Product[] = [];
  constructor(private productService : ProductListService, private msgService : MessengerService) { }

  ngOnInit(): void {
    this.msgService.getSearchFilters().subscribe((product: any) => {
    this.productService.searchProducts(product).subscribe(res => { this.productList  = res; });;
    })
    this.productService.getProducts().subscribe(res => { this.productList  = res; });;
    }
}
