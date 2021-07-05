import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
// import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, pipe } from 'rxjs';
import { ImageFormatterComponent } from "src/app/image-formatter-component";
import { map } from 'rxjs/operators';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { ProductBrand } from 'src/app/classes/productBrand';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Pipe } from '@angular/core';
import { ProductSize } from 'src/app/constants/product-setup-constants';
import { ProductFor } from 'src/app/constants/product-setup-constants';
import { ProductOccasion } from 'src/app/constants/product-setup-constants';
import { ProductFit } from 'src/app/constants/product-setup-constants';
import { ProductSetupService } from 'src/app/services/product-setup.services';
import { UtilityService } from 'src/app/services/utility.services';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';



@Component({
  selector: 'app-product-setup',
  templateUrl: './product-setup.component.html',
  styleUrls: ['./product-setup.component.scss'],
  providers: [ProductSetupService, UtilityService]
})

export class ProductSetupComponent  implements OnInit {

  formProductCategories:FormGroup; formProductSubCategories:FormGroup; formProductColors:FormGroup; formProductBrands:FormGroup; formProducts: FormGroup;
  socialUser: any;
  productCategoryList: any;
  productSubCategoryList: any;
  productBrandList: any;
  productColorList: any;
  productSizeList: any;
  productForList: any;
  productOccasionList: any;
  productFitList: any;
  productCategoryIdSelectedValue: any;
  productSubCategoryIdSelectedValue: any;
  productBrandIdSelectedValue: any;
  productColorIdSelectedValue: any;
  productIdSelectedValue: any;
  productSizeIdsSelected:any;
  productForIdSelectedValue:any;
  productOccasionIdSelectedValue:any;
  productFitIdSelectedValue:any;
  selectedProductBrandImage: File ;
  selectedProductColorImage: File ;
  selectedProductImage: File ;
  selected:[];

  constructor(private fb: FormBuilder, private apiService: ProductSetupService, private utilityService: UtilityService, private toastrService: ToastrService,
     private domSanitizer: DomSanitizer) {
   this.productCategoryIdSelectedValue = 0;
   this.productSubCategoryIdSelectedValue = 0;
 };


  ngOnInit():void{

    this.createForm();
    this.rowDataProductCategories = this.apiService.getProductCategories();
    this.rowDataProductSubCategories = this.apiService.getProductSubCategories();
    this.rowDataProductColors = this.apiService.getProductColors();
    this.rowDataProductBrands = this.apiService.getProductBrands();
    this.rowDataProducts = this.apiService.getProducts();
    this.productCategoryList = this.rowDataProductCategories;
    this.productColorList = this.rowDataProductColors;
    this.productSizeList= this.utilityService.ConvertEnumToObject(ProductSize);
    this.productForList= this.utilityService.ConvertEnumToObject(ProductFor);
    this.productOccasionList= this.utilityService.ConvertEnumToObject(ProductOccasion);
    this.productFitList= this.utilityService.ConvertEnumToObject(ProductFit);
    this.socialUser = localStorage.getItem('userId')?.toString();
  }

    @Pipe({ name: 'safeHtml' })

  columnDefsProductCategories = [
    { headerName: 'Product Category Code', field: 'productCategoryCode', sortable: true, filter: true, editable: false },
    { headerName: 'Product Category Name', field: 'productCategoryName', sortable: true, filter: true, editable: true },
    { headerName: 'Product Category Desc', field: 'productCategoryDesc', sortable: true, filter: true, editable: true }];

  columnDefsProductSubCategories = [
    { headerName: 'Product Category Name', field: 'productCategory.productCategoryName', sortable: true, filter: true, editable: false },
    { headerName: 'Product SubCategory Code', field: 'productSubCategoryCode', sortable: true, filter: true, editable: false },
    { headerName: 'Product SubCategory Name', field: 'productSubCategoryName', sortable: true, filter: true, editable: true },
    { headerName: 'Product SubCategory Desc', field: 'productSubCategoryDesc', sortable: true, filter: true, editable: true }];

  columnDefsProductColors = [
    { headerName: 'Product Color Code', field: 'productColorCode', sortable: true, filter: true, editable: false },
    { headerName: 'Product Color Name', field: 'productColorName', sortable: true, filter: true, editable: false },
    { headerName: 'Product Color Desc', field: 'productColorDesc', sortable: true, filter: true, editable: true },
    { headerName: 'Product Color Image', field: 'productColorImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent }];

  columnDefsProductBrands = [
    { headerName: 'Product Category Name', field: 'productCategory.productCategoryName', sortable: true, filter: true, editable: false },
    { headerName: 'Product SubCategory Name', field: 'productSubCategory.productSubCategoryName', sortable: true, filter: true, editable: false },
    { headerName: 'Product Brand Code', field: 'productBrandCode', sortable: true, filter: true, editable: false },
    { headerName: 'Product Brand Name', field: 'productBrandName', sortable: true, filter: true, editable: true },
    { headerName: 'Product Brand Desc', field: 'productBrandDesc', sortable: true, filter: true, editable: true },
    { headerName: 'Product Brand Image', field: 'productBrandImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent }];

  columnDefsProducts = [
    { headerName: 'Product Category Name', field: 'productCategory.productCategoryName', sortable: true, filter: true, editable: false },
    { headerName: 'Product SubCategory Name', field: 'productSubCategory.productSubCategoryName', sortable: true, filter: true, editable: false },
    { headerName: 'Product Brand', field: 'productBrand.productBrandImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent },
    { headerName: 'Product Color', field: 'productColor.productColorImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent },
    { headerName: 'Product Code', field: 'productCode', sortable: true, filter: true, editable: false },
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true, editable: true },
    { headerName: 'Product Desc', field: 'productDesc', sortable: true, filter: true, editable: true },
    { headerName: 'Product Image', field: 'productImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent },
    { headerName: 'Product Price', field: 'productPrice', sortable: true, filter: true, editable: true },
    { headerName: 'Product Discount', field: 'productDiscount', sortable: true, filter: true, editable: true },
  ];

 

 
  rowDataProductCategories: any;
  rowDataProductSubCategories: any;
  rowDataProductColors: any;
  rowDataProductBrands: any;
  rowDataProducts: any;
  isSubmitted = false;
  

  // gridApi and columnApi
  private apiProductCategory:GridApi; apiProductSubCategory:GridApi; apiProductColor:GridApi; apiProductBrand:GridApi; apiProduct: GridApi;
  private columnApiProductCategory:ColumnApi; columnApiProductSubCategory:ColumnApi; columnApiProductColor:ColumnApi; columnApiProductBrand:ColumnApi; columnApiProduct: ColumnApi;


  private itemsProductSubCategory: Observable<ProductSubCategory[]>;
  private itemsProductBrand: Observable<ProductBrand[]>;


  createForm() {
    this.formProductCategories = this.fb.group({
      ProductCategoryCode: ['', Validators.required],
      ProductCategoryName: ['', Validators.required],
      ProductCategoryDesc: ['', Validators.required]
    });

    this.formProductSubCategories = this.fb.group({
      ProductCategoryCode: [''],
      ProductSubCategoryCode: ['', Validators.required],
      ProductSubCategoryName: ['', Validators.required],
      ProductSubCategoryDesc: ['', Validators.required]
    });


    
    this.formProductColors = this.fb.group({
      ProductColorCode: ['', Validators.required],
      ProductColorName: ['', Validators.required],
      ProductColorDesc: ['', Validators.required],
      ProductColorImg: ['']

    });

    this.formProductBrands = this.fb.group({
      ProductCategoryCode: [''],
      ProductSubCategoryCode: [''],
      ProductBrandCode: ['', Validators.required],
      ProductBrandName: ['', Validators.required],
      ProductBrandDesc: ['', Validators.required],
      ProductBrandImg: ['']

    });

    this.formProducts = this.fb.group({
      ProductCategoryCode: [''],
      ProductSubCategoryCode: [''],
      ProductBrandCode: [''],
      ProductCode: ['', Validators.required],
      ProductName: ['', Validators.required],
      ProductDesc: ['', Validators.required],
      ProductImg: [''],
      ProductSize: [''],
      selectProductFor:['0'],
      ProductOccasion: [''],
      ProductFit: [''],
      ProductPrice:['',Validators.required],
      ProductDiscount:['']
    });

  }

  // transform(html:string) : SafeUrl{
  //   return this.domSanitizer.bypassSecurityTrustUrl(html);
  // }

  //#region  ProductCategories Actions
  onSubmitProductCategories() {
    let formData: any = new FormData();
    formData.append("productCategoryCode", this.formProductCategories.get('ProductCategoryCode')?.value);
    formData.append("productCategoryName", this.formProductCategories.get('ProductCategoryName')?.value);
    formData.append("productCategoryDesc", this.formProductCategories.get('ProductCategoryDesc')?.value);
    formData.append("createdBy", this.socialUser);
    let postData = this.utilityService.ConvertFormDataToJson(formData);
    let productCategoryCode = this.formProductCategories.get('ProductCategoryCode')?.value;

    if (postData.length > 0) {
      this.apiService.addProductCategory(postData, productCategoryCode).subscribe((response) =>
        (this.toastrService.success('Product Category saved successfully!', 'Confirmation Msg!'),
          this.formProductCategories.reset(), this.rowDataProductCategories = this.apiService.getProductCategories()),
        error => (this.toastrService.error('Product Category save failed!', 'Confirmation Msg!'), console.log('error'))
      )

    }

    else {
      this.toastrService.error('Product Category save failed!', 'Confirmation Msg!');
    }

  }
  onCellValueChangedProductCategories(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductCategory(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product Category updated successfully!', 'Confirmation Msg!')),
      error => (this.toastrService.error('Product Category update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onGridReadyProductCategories(params:any): void {
    this.apiProductCategory = params.api;
    this.columnApiProductCategory = params.columnApi;
    this.apiProductCategory.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProductCategory.hideOverlay();
  }
  deleteRowProductCategories() {
    var selectedData = this.apiProductCategory.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteDialog()) {
        this.apiService.deleteProductCategory(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          (this.toastrService.success('Product Category deleted successfully!',
            'Confirmation Msg!'), this.rowDataProductCategories = this.apiService.getProductCategories()),
          error => (this.toastrService.error('Product Category delete failed!', 'Confirmation Msg!'), console.log('error'))
        )
      }
    }
    else {
      alert('Please select a row!');
    }
  }
  changeProductCategory(e:any) {
    this.productCategoryIdSelectedValue = e.target.value;
    this.productSubCategoryList = this.apiService.getProductSubCategories().pipe(map(itemsProductSubCategory => itemsProductSubCategory.filter(ProductSubCategory => ProductSubCategory.productCategory._id == this.productCategoryIdSelectedValue)));
    return;
  }


  //#endregion

  //#region ProductSubCategories Action

  onCellValueChangedProductSubCategories(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductSubCategory(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product SubCategory updated successfully!', 'Confirmation Msg!')),
      error => (this.toastrService.error('Product SubCategory update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onGridReadyProductSubCategories(params:any): void {
    this.apiProductSubCategory = params.api;
    this.columnApiProductSubCategory = params.columnApi;
    this.apiProductSubCategory.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProductSubCategory.hideOverlay();
  
  
  }

  // onFirstDataRenderedProductSubCategories(params:any): void {
  //   this.apiProductSubCategory = params.api;
  //   this.columnApiProductSubCategory = params.columnApi;
  //   this.apiProductSubCategory.sizeColumnsToFit();
  //   // temp fix until AG-1181 is fixed
  //   this.apiProductSubCategory.hideOverlay();
  
  
  // }

  onSubmitProductSubCategories() {

    if (this.productCategoryIdSelectedValue == '0') {
      alert('Please select Product Category!');
      return;
    }
    else {
      this.isSubmitted = true;
      let formData: any = new FormData();
      formData.append("productCategoryId", this.productCategoryIdSelectedValue)
      formData.append("productSubCategoryCode", this.formProductSubCategories.get('ProductSubCategoryCode')?.value);
      formData.append("productSubCategoryName", this.formProductSubCategories.get('ProductSubCategoryName')?.value);
      formData.append("productSubCategoryDesc", this.formProductSubCategories.get('ProductSubCategoryDesc')?.value);
      formData.append("createdBy", this.socialUser);
      let postData = this.utilityService.ConvertFormDataToJson(formData);
      let productSubCategoryCode = this.formProductSubCategories.get('ProductSubCategoryCode')?.value;

      if (postData.length > 0) {
        this.apiService.addProductSubCategory(postData, productSubCategoryCode).subscribe((response) =>
          (this.toastrService.success('Product Sub Category saved successfully!', 'Confirmation Msg!'),
            this.formProductSubCategories.reset(), this.rowDataProductSubCategories = this.apiService.getProductSubCategories()),
          error => (this.toastrService.error('Product Sub SubCategory save failed!', 'Confirmation Msg!'), console.log('error'))
        )

      }

      else {
        this.toastrService.error('Product SubCategory save failed!', 'Confirmation Msg!');
      }
    }

  }

  deleteRowProductSubCategories() {
    var selectedData = this.apiProductSubCategory.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteDialog()) {
        this.apiService.deleteProductSubCategory(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          (this.toastrService.success('Product SubCategory deleted successfully!',
            'Confirmation Msg!'), this.rowDataProductSubCategories = this.apiService.getProductSubCategories()),
          error => (this.toastrService.error('Product SubCategory delete failed!', 'Confirmation Msg!'), console.log('error'))
        )
      }
    }
    else {
      alert('Please select a row!');
    }
  }


  changeProductSubCategory(e:any) {
    this.productSubCategoryIdSelectedValue = e.target.value;
    this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));
    return;
  }

  //#endregion


  //#region ProductColors Action

  onCellValueChangedProductColors(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy =this.socialUser;
    this.apiService.updateProductColor(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product Color updated successfully!', 'Confirmation Msg!')),
      error => (this.toastrService.error('Product Color update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onGridReadyProductColors(params:any): void {
    this.apiProductColor = params.api;
    this.columnApiProductColor = params.columnApi;
    this.apiProductColor.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProductColor.hideOverlay();

  }

  onSubmitProductColors() {

    if (this.selectedProductColorImage == null) {
      alert('Please upload Product color Image!');
      return;
    }

    let formData: any = new FormData();

    formData.append("productColorCode", this.formProductColors.get('ProductColorCode')?.value);
    formData.append("productColorName", this.formProductColors.get('ProductColorName')?.value);
    formData.append("productColorDesc", this.formProductColors.get('ProductColorDesc')?.value);
    formData.append("productColorImg", this.formProductColors.get('ProductColorImg')?.value, this.selectedProductColorImage.name);
    formData.append("createdBy", this.socialUser);
    let postData = this.utilityService.ConvertFormDataToJson(formData);
    let productColorCode = this.formProductColors.get('ProductColorCode')?.value;

    if (postData.length > 0) {
      this.apiService.addProductColor(formData, productColorCode).subscribe((response) =>
        (this.toastrService.success('Product Color saved successfully!', 'Confirmation Msg!'),
          this.formProductColors.reset(), this.rowDataProductColors = this.apiService.getProductColors()),
        error => (this.toastrService.error('Product Color save failed!', 'Confirmation Msg!'), console.log('error'))
      )
    }
    else {
      this.toastrService.error('Product Color save failed!', 'Confirmation Msg!');
    }
  }

  deleteRowProductColors() {
    var selectedData = this.apiProductColor.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteDialog()) {
        this.apiService.deleteProductColor(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          (this.toastrService.success('Product Color deleted successfully!',
            'Confirmation Msg!'), this.rowDataProductColors = this.apiService.getProductColors()),
          error => (this.toastrService.error('Product Color delete failed!', 'Confirmation Msg!'), console.log('error'))
        )
      }
    }
    else {
      alert('Please select a row!');
    }
  }

  onProductColorSelected(event:any) {
    this.selectedProductColorImage = event.target.files[0];
    this.formProductColors.get('ProductColorImg')?.setValue(this.selectedProductColorImage);
  }

  changeProductColor(e:any) {
    this.productColorIdSelectedValue = e.value;
    return;
  }


  //#endregion Product Color

  //#region Product Brands
  onSubmitProductBrands() {

    if (this.selectedProductBrandImage == null) {
      alert('Please upload Product brand Image!');
      return;
    }

    let formData: any = new FormData();
    formData.append("productCategoryId", this.productCategoryIdSelectedValue);
    formData.append("productSubCategoryId", this.productSubCategoryIdSelectedValue);
    formData.append("productBrandCode", this.formProductBrands.get('ProductBrandCode')?.value);
    formData.append("productBrandName", this.formProductBrands.get('ProductBrandName')?.value);
    formData.append("productBrandDesc", this.formProductBrands.get('ProductBrandDesc')?.value);
    formData.append("productBrandImg", this.formProductBrands.get('ProductBrandImg')?.value, this.selectedProductBrandImage.name);
    formData.append("createdBy",this.socialUser);
    let postData = this.utilityService.ConvertFormDataToJson(formData);
    let productBrandCode = this.formProductBrands.get('ProductBrandCode')?.value;

    if (postData.length > 0) {
      this.apiService.addProductBrand(formData, productBrandCode).subscribe((response) =>
        (this.toastrService.success('Product Brand saved successfully!', 'Confirmation Msg!'),
          this.formProductBrands.reset(), this.rowDataProductBrands = this.apiService.getProductBrands()),
        error => (this.toastrService.error('Product Brand save failed!', 'Confirmation Msg!'), console.log('error'))
      )
    }
    else {
      this.toastrService.error('Product Brand save failed!', 'Confirmation Msg!');
    }
  }

  deleteRowProductBrands() {
    var selectedData = this.apiProductBrand.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteDialog()) {
        this.apiService.deleteProductBrand(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          (this.toastrService.success('Product Brand deleted successfully!',
            'Confirmation Msg!'), this.rowDataProductBrands = this.apiService.getProductBrands()),
          error => (this.toastrService.error('Product Brand delete failed!', 'Confirmation Msg!'), console.log('error'))
        )
      }
    }
    else {
      alert('Please select a row!');
    }
  }

  onGridReadyProductBrands(params:any): void {
    this.apiProductBrand = params.api;
    this.columnApiProductBrand = params.columnApi;
    this.apiProductBrand.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProductBrand.hideOverlay();

  }

  onCellValueChangedProductBrands(params: any) {
    if (params.oldValue === params.newValue) return;
     params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductBrand(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product Brand updated successfully!', 'Confirmation Msg!')),
      error => (this.toastrService.error('Product Brand update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onProductBrandSelected(event:any) {
    this.selectedProductBrandImage = event.target.files[0];
    this.formProductBrands.get('ProductBrandImg')?.setValue(this.selectedProductBrandImage);
  }

  changeProductBrand(e:any) {
    this.productBrandIdSelectedValue = e.value;
    return;
  }
  //#endregion Product Brands


  //#region  Products

  changeProduct(e:any) {
    this.productIdSelectedValue = e.target.value;
    return;
  }

  onCellValueChangedProducts(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductCategory(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product Category updated successfully!', 'Confirmation Msg!')),
      error => (this.toastrService.error('Product Category update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }

  onGridReadyProducts(params:any): void {
    this.apiProduct = params.api;
    this.columnApiProduct = params.columnApi;
    this.apiProduct.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProduct.hideOverlay();
  }

  onProductSelected(event:any) {
    this.selectedProductImage = event.target.files[0];
    this.formProducts.get('ProductImg')?.setValue(this.selectedProductImage);
  }

  onProductSizeChange(e:any): void {
    this.productSizeIdsSelected = Array.prototype.map.call(e, function(item) { return item.name; }).join(",");
    }
    
  changeProductFor(e:any) {
    this.productForIdSelectedValue = e.target.value;
    return;
  }
  changeProductOccasion(e:any) {
    this.productOccasionIdSelectedValue= e.target.value;
    return;
   }
  changeProductFit(e:any){
    this.productFitIdSelectedValue= e.target.value;
    return;
  }

  onSubmitProducts() {
    if (this.selectedProductImage == null) {
      alert('Please upload Product Image!');
      return;
    }

    let formData: any = new FormData();
    formData.append("productCategoryId", this.productCategoryIdSelectedValue);
    formData.append("productSubCategoryId", this.productSubCategoryIdSelectedValue);
    formData.append("productBrandId", this.productBrandIdSelectedValue);
    formData.append("productColorId", this.productColorIdSelectedValue);
    formData.append("productCode", this.formProducts.get('ProductCode')?.value);
    formData.append("productName", this.formProducts.get('ProductName')?.value);
    formData.append("productDesc", this.formProducts.get('ProductDesc')?.value);
    formData.append("productImg", this.formProducts.get('ProductImg')?.value, this.selectedProductImage.name);
    formData.append("productSize", this.productSizeIdsSelected);
    formData.append("productFor", this.productForIdSelectedValue);
    formData.append("productOccasion", this.productOccasionIdSelectedValue);
    formData.append("productFit", this.productFitIdSelectedValue);
    formData.append("productPrice", this.formProducts.get('ProductPrice')?.value);
    formData.append("createdBy", this.socialUser);
    let postData = this.utilityService.ConvertFormDataToJson(formData);
    let productCode = this.formProducts.get('ProductCode')?.value;

    if (postData.length > 0) {
      this.apiService.addProduct(formData, productCode).subscribe((response) =>
        (this.toastrService.success('Product saved successfully!', 'Confirmation Msg!'),
          this.formProducts.reset(), this.rowDataProducts = this.apiService.getProducts()),
        error => (this.toastrService.error('Product save failed!', 'Confirmation Msg!'), console.log('error'))
      )
      this.resetAllDropDowns();
    }
    else {
      this.toastrService.error('Product save failed!', 'Confirmation Msg!');
    }
  }

  deleteRowProduct() {
    var selectedData = this.apiProductBrand.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteDialog()) {
        this.apiService.deleteProduct(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          (this.toastrService.success('Product  deleted successfully!',
            'Confirmation Msg!'), this.rowDataProducts = this.apiService.getProducts()),
          error => (this.toastrService.error('Product delete failed!', 'Confirmation Msg!'), console.log('error'))
        )
      }
    }
    else {
      alert('Please select a row!');
    }
  }
  

  resetAllDropDowns(){
    this.formProducts.patchValue({
      selectProductFor: 'Choose Product For', 
    });
    
  }
  
  loadProductsSetup(){
    this.rowDataProductCategories = this.apiService.getProductCategories();
    this.rowDataProductSubCategories = this.apiService.getProductSubCategories();
    this.rowDataProductColors = this.apiService.getProductColors();
    this.rowDataProductBrands = this.apiService.getProductBrands();
    this.rowDataProducts = this.apiService.getProducts();
    this.productCategoryList = this.rowDataProductCategories;
    this.productColorList = this.rowDataProductColors;
    this.productSizeList= this.utilityService.ConvertEnumToObject(ProductSize);
    this.productForList= this.utilityService.ConvertEnumToObject(ProductFor);
    this.productOccasionList= this.utilityService.ConvertEnumToObject(ProductOccasion);
    this.productFitList= this.utilityService.ConvertEnumToObject(ProductFit);
   
}
}

