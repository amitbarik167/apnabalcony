import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.services';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  page = 1;
  pageSize =6;
  productList: Product[] = [];
  flag: boolean = false;
  progressbarValue = 100;
  curSec: number = 0;
  product: any;
  productCategory:any;
  productCategoryDisplay:string='';
  productSearched:any;
  constructor(private productService: ProductListService, private msgService: MessengerService, private route: ActivatedRoute) {
    this.progressbarValue = 100;

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.progressBar(2);

        if (this.route.snapshot.paramMap.get('searchedProductName') != null) {
          this.product = new Product();
          const searchedProduct = this.route.snapshot.paramMap.get('searchedProductName');
          this.product.productName = searchedProduct;
          this.productService.searchProducts(this.product).subscribe(res => { this.productList = res; });;
          this.productCategoryDisplay=""
        }
        else if (this.route.snapshot.paramMap.get('productCategoryId') != null) {
          this.product = new Product();
          const productCategoryId = this.route.snapshot.paramMap.get('productCategoryId');
          const productCategoryName= this.route.snapshot.paramMap.get('productCategoryName');
          this.product.productCategory = productCategoryId;
          this.productService.searchProducts(this.product).subscribe(res => { this.productList = res; });;
          this.productCategoryDisplay = productCategoryName || ''
        }
        else {
          this.productService.getProducts().subscribe(res => { this.productList = res; });
        }
      }
  );
  



    this.msgService.getSearchFilters().subscribe((product: any) => {
      this.productCategoryDisplay=""
      this.productList = [];
      this.progressBar(2);
      if (Object.keys(product).length > 0) {

        this.productService.searchProducts(product).subscribe(res => { this.productList = res; });;

      }
      else {
        this.progressBar(5);
        this.productService.getProducts().subscribe(res => { this.productList = res; });
      }

      this.flag = true;
    })

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
