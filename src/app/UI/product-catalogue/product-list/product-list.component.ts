import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.services';
import { Product } from 'src/app/classes/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList : Product[] = [];
  constructor(private productService : ProductListService) { }

  ngOnInit(): void {
  this.productService.getProducts().subscribe(res => { this.productList  = res; });;
  }

}
