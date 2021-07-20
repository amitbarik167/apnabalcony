import { Component, OnInit } from '@angular/core';
import { ProductSetupService } from 'src/app/services/product-setup.services';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from 'src/app/classes/productBrand';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { A11yModule } from '@angular/cdk/a11y';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers:[ProductSetupService]
})
export class FiltersComponent implements OnInit {

  productCategoryList: any;
  productSubCategoryList: any;
  productBrandList: any;
  productColorList: any;
  productCategoryIdSelectedValue: any;
  productSubCategoryIdSelectedValue:any;
  private itemsProductSubCategory: Observable<ProductSubCategory[]>;
  private itemsProductBrand: Observable<ProductBrand[]>;

  constructor(private apiService: ProductSetupService) { }

  ngOnInit(): void {

   this.productCategoryList = this.apiService.getProductCategories();
   this.productColorList =  this.apiService.getProductColors()
  }

  changeProductCategory(e:any) {
    this.productCategoryIdSelectedValue = e.target.value;
    this.productSubCategoryList = this.apiService.getProductSubCategories().pipe(map(itemsProductSubCategory => itemsProductSubCategory.filter(ProductSubCategory => ProductSubCategory.productCategory?._id == this.productCategoryIdSelectedValue)));
    return;
   
  }

  changeProductSubCategory(e:any) {
    this.productSubCategoryIdSelectedValue = e.target.value;
    this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));
    return;
  }

  changeProductBrand(e:any) {
  }

  changeProductColor(e:any) {
  }

  onInputChangePrice(event:any) {
    alert(event.value);
    console.log("This is emitted as the thumb slides");
    console.log(event.value);
  }

  onInputChangeDiscount(event:any) {
    alert(event.value);
    console.log("This is emitted as the thumb slides");
    console.log(event.value);
  }
  //#en

}
