import { Component, OnInit } from '@angular/core';
import { ProductListService } from 'src/app/services/product-list.services';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from 'src/app/classes/productBrand';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/classes/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductCategory } from 'src/app/classes/productCategory';
import { ProductColor } from 'src/app/classes/productColor';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
 
})
export class FiltersComponent implements OnInit {

  productCategoryList: any;
  productSubCategoryList: any;
  productBrandList: any;
  productColorList: any;
  productCategoryIdSelectedValue: string;
  productSubCategoryIdSelectedValue:string;
  productBrandIdSelectedValue:string;
  private itemsProductSubCategory: Observable<ProductSubCategory[]>;
  private itemsProductBrand: Observable<ProductBrand[]>;
  product:Product;
  productCategory : ProductCategory;
  productSubCategory : ProductSubCategory;
  productBrand : ProductBrand;
  ProductColor : ProductColor;
  selectedColor : string;
  constructor(private apiService: ProductListService, private msgServicice :MessengerService) { }

  ngOnInit(): void {

   this.productCategoryList = this.apiService.getProductCategories();
   this.productColorList =  this.apiService.getProductColors()
   this.product = new Product();
   this.productSubCategory = new ProductSubCategory();
   this.productCategory = new ProductCategory();
   this.productBrand = new ProductBrand();
   this.selectedColor = "Choose Product Color";
   this.ProductColor = new ProductColor();
  }

  changeProductCategory(e:any) {
  
    this.product = new Product();
  
    this.productCategoryIdSelectedValue = e.target.value;
    this.productSubCategoryList = this.apiService.getProductSubCategories().pipe(map(itemsProductSubCategory => itemsProductSubCategory.filter(ProductSubCategory => ProductSubCategory.productCategory?._id == this.productCategoryIdSelectedValue)));
    
    this.productSubCategoryIdSelectedValue = e.target.value;
    this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));

    this.productCategory._id = this.productCategoryIdSelectedValue
    this.product.productCategory = this.productCategory;
    this.msgServicice.sendSearchFilters(this.product);
    this.productColorList = [];
    this.productColorList =  this.apiService.getProductColors();

    return;
   
  }

  changeProductSubCategory(e:any) {
    this.productSubCategoryIdSelectedValue = e.target.value;
    this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));
    this.productSubCategory._id = this.productSubCategoryIdSelectedValue;
    this.product.productSubCategory = this.productSubCategory;
    this.msgServicice.sendSearchFilters(this.product);
    return;
  }

  changeProductBrand(e:any) {
    this.productBrandIdSelectedValue = e.value;
    this.productBrand._id = this.productBrandIdSelectedValue;
    this.product.productBrand = this.productBrand;
    this.msgServicice.sendSearchFilters(this.product);
  }

  changeProductColor(e:any) {
    this.ProductColor._id = e.value;
    this.product.productColor = this.ProductColor;
    this.msgServicice.sendSearchFilters(this.product);

  }

  onInputChangePrice(event:any) {
    if(event.value> 0)
    {
      this.product.productPrice = event.value;
     this.msgServicice.sendSearchFilters(this.product);
    }
    else if (event.value == 0)
    {
      this.product = new Product();
      this.msgServicice.sendSearchFilters(this.product);
    }

  }

  onInputChangeDiscount(event:any) {
    if(event.value > 0)
     { 
    this.product.productDiscount = event.value;
    this.msgServicice.sendSearchFilters(this.product);
     }
     else if (event.value == 0)
     {
       this.product = new Product();
       this.msgServicice.sendSearchFilters(this.product);
     }
  }
  //#en

}
