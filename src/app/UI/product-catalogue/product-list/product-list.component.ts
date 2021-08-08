import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.services';
import { Product } from 'src/app/classes/product';
import { Observable, timer } from 'rxjs';
import { MessengerService } from 'src/app/services/messenger.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList : Product[] = [];
   flag:boolean = false;
   progressbarValue = 100;
   curSec: number = 0;
  constructor(private productService : ProductListService, private msgService : MessengerService) {
    this.progressbarValue=100;

    }

  ngOnInit(): void {
    this.progressbarValue=100;
    const time = 10;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / time;
      this.curSec = sec;

      if (this.curSec === time) {
        sub.unsubscribe();
      }
    });
    
    this.productService.getProducts().subscribe(res => { this.productList  = res; });
    
      this.msgService.getSearchFilters().subscribe((product: any) => {
      this.productList = [];
      if(Object.keys(product).length>0){
        
      this.productService.searchProducts(product).subscribe(res => { this.productList  = res;});;
      
      }
      else{
        this.productService.getProducts().subscribe(res => { this.productList  = res; });
      }
      
      this.flag= true;
  })
   
    
    

   

    }
   

}
