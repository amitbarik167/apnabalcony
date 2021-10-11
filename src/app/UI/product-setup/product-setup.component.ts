import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ImageFormatterComponent } from "src/app/image-formatter-component";
import { map } from 'rxjs/operators';
import { ProductSubCategory } from 'src/app/classes/productSubCategory';
import { Pipe } from '@angular/core';
import { ProductSize } from 'src/app/constants/product-setup-constants';
import { ProductFor } from 'src/app/constants/product-setup-constants';
import { ProductOccasion } from 'src/app/constants/product-setup-constants';
import { ProductFit } from 'src/app/constants/product-setup-constants';
import { ProductSetupService } from 'src/app/services/product-setup.services';
import { UtilityService } from 'src/app/services/utility.services';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/classes/product';
import { ProductCategory } from 'src/app/classes/productCategory';
import { ProductColor } from 'src/app/classes/productColor';
import { ProductBrand } from 'src/app/classes/productBrand';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-product-setup',
  templateUrl: './product-setup.component.html',
  styleUrls: ['./product-setup.component.scss'],
  providers: [ProductSetupService, UtilityService],
  encapsulation: ViewEncapsulation.None
})

export class ProductSetupComponent implements OnInit {

  formProductCategories: FormGroup; formProductSubCategories: FormGroup; formProductColors: FormGroup; formProductBrands: FormGroup; formProducts: FormGroup; formProductImages: FormGroup;
  formTemplate: FormGroup;
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
  productSizeIdsSelected: any;
  productForIdSelectedValue: any;
  productOccasionIdSelectedValue: any;
  productFitIdSelectedValue: any;
  selectedProductBrandImage: File;
  selectedProductCategoryImage: File;
  selectedProductSubCategoryImage: File;
  selectedProductColorImage: File;
  selectedProductImage: File;
  fileSource: FileList;
  selected: [];
  product: any;
  productCategory: ProductCategory;
  productSubCategory: ProductSubCategory;
  productBrand: ProductBrand;
  ProductColor: ProductColor;
  productList: Product[] = [];
  images: any = [];
  imagesList: any = [];
  templateImageLIst: any =[];
  formData: any = new FormData();
  selectedColor: string;

  constructor(private fb: FormBuilder, private apiService: ProductSetupService, private utilityService: UtilityService, private toastrService: ToastrService,
    private cookieService: CookieService, private msgService: MessengerService) {
    this.productCategoryIdSelectedValue = 0;
    this.productSubCategoryIdSelectedValue = 0;
  };


  ngOnInit(): void {
    this.msgService.sendClearProductSearch();
    this.createForm();
    this.rowDataProductCategories = this.apiService.getProductCategories();
    this.rowDataProductSubCategories = this.apiService.getProductSubCategories();
    this.rowDataProductColors = this.apiService.getProductColors();
    this.rowDataProductBrands = this.apiService.getProductBrands();
    this.rowDataProducts = this.apiService.getProducts();
    this.rowDataTemplate = this.apiService.getAllTemplates();
    this.productCategoryList = this.rowDataProductCategories;
    this.productColorList = this.rowDataProductColors;
    this.productSizeList = this.utilityService.ConvertEnumToObject(ProductSize);
    this.productForList = this.utilityService.ConvertEnumToObject(ProductFor);
    this.productOccasionList = this.utilityService.ConvertEnumToObject(ProductOccasion);
    this.productFitList = this.utilityService.ConvertEnumToObject(ProductFit);
    this.socialUser = this.cookieService.get('userId')?.toString();
    this.product = new Product();
    this.productSubCategory = new ProductSubCategory();
    this.productCategory = new ProductCategory();
    this.productBrand = new ProductBrand();
    this.ProductColor = new ProductColor();
    this.selectedColor = "Choose Product Color";
  }

  @Pipe({ name: 'safeHtml' })

  columnDefsProductCategories = [
    { headerName: 'Product Category Code', field: 'productCategoryCode', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product Category Name', field: 'productCategoryName', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Category Desc', field: 'productCategoryDesc', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Category Image', field: 'productCategoryImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Modified By', field: 'modifiedBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false, resizable: true }];

  columnDefsProductSubCategories = [
    { headerName: 'Product Category Name', field: 'productCategory.productCategoryName', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product SubCategory Code', field: 'productSubCategoryCode', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product SubCategory Name', field: 'productSubCategoryName', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product SubCategory Desc', field: 'productSubCategoryDesc', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product SubCategory Image', field: 'productSubCategoryImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Modified By', field: 'modifiedBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false, resizable: true }];

  columnDefsProductColors = [
    { headerName: 'Product Color Code', field: 'productColorCode', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product Color Name', field: 'productColorName', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product Color Desc', field: 'productColorDesc', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Color Image', field: 'productColorImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Modified By', field: 'modifiedBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false, resizable: true }];

  columnDefsProductBrands = [
    { headerName: 'Product Category Name', field: 'productCategory.productCategoryName', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product SubCategory Name', field: 'productSubCategory.productSubCategoryName', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product Brand Code', field: 'productBrandCode', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Product Brand Name', field: 'productBrandName', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Brand Desc', field: 'productBrandDesc', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Brand Image', field: 'productBrandImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Modified By', field: 'modifiedBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false, resizable: true }
  ];

  columnDefsProducts = [
    { headerName: 'Product Category Name', field: 'productCategory.productCategoryName', sortable: true, filter: true, editable: false, tooltipField: 'productCategory.productCategoryName', resizable: true },
    { headerName: 'Product SubCategory Name', field: 'productSubCategory.productSubCategoryName', sortable: true, filter: true, editable: false, tooltipField: 'productSubCategory.productSubCategoryName', resizable: true },
    { headerName: 'Product Brand', field: 'productBrand.productBrandImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Product Color', field: 'productColor.productColorImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Product Code', field: 'productCode', sortable: true, filter: true, editable: false, tooltipField: 'productCode', resizable: true },
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true, editable: true, tooltipField: 'productName', resizable: true },
    { headerName: 'Product Desc', field: 'productDesc', sortable: true, filter: true, editable: true, tooltipField: 'productDesc', resizable: true },
    { headerName: 'Product Image', field: 'productImg', sortable: true, filter: true, editable: false, cellRendererFramework: ImageFormatterComponent, resizable: true },
    { headerName: 'Product Price', field: 'productPrice', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Discount', field: 'productDiscount', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Product Stock Units', field: 'productStockUnits', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Modified By', field: 'modifiedBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false, resizable: true }
  ];

  columnDefsTemplate = [

    { headerName: 'Template Code', field: 'templateCode', sortable: true, filter: true, editable: false, tooltipField: 'productCode', resizable: true },
    { headerName: 'Template Name', field: 'templateName', sortable: true, filter: true, editable: true, tooltipField: 'productName', resizable: true },
    { headerName: 'Template Desc', field: 'templateDesc', sortable: true, filter: true, editable: true, tooltipField: 'productDesc', resizable: true },
    { headerName: 'Template Price', field: 'templatePrice', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Balcony Size', field: 'balconySize', sortable: true, filter: true, editable: true, resizable: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Modified By', field: 'modifiedBy', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false, resizable: true },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false, resizable: true }
  ];





  rowDataProductCategories: any;
  rowDataProductSubCategories: any;
  rowDataProductColors: any;
  rowDataProductBrands: any;
  rowDataProducts: any;
  rowDataTemplate: any;
  isSubmitted = false;


  // gridApi and columnApi
  private apiProductCategory: GridApi; apiProductSubCategory: GridApi; apiProductColor: GridApi; apiProductBrand: GridApi; apiProduct: GridApi; apiTemplate: GridApi
  private columnApiProductCategory: ColumnApi; columnApiProductSubCategory: ColumnApi; columnApiProductColor: ColumnApi; columnApiProductBrand: ColumnApi; columnApiProduct: ColumnApi; columnApiTemplate: ColumnApi;


  private itemsProductSubCategory: Observable<ProductSubCategory[]>;
  private itemsProductBrand: Observable<ProductBrand[]>;


  createForm() {
    this.formProductCategories = this.fb.group({
      ProductCategoryCode: ['', Validators.required],
      ProductCategoryName: ['', Validators.required],
      ProductCategoryDesc: ['', Validators.required],
      ProductCategoryImg: ['']
    });

    this.formProductSubCategories = this.fb.group({

      ProductCategoryCode: [''],
      ProductSubCategoryCode: ['', Validators.required],
      ProductSubCategoryName: ['', Validators.required],
      ProductSubCategoryDesc: ['', Validators.required],
      ProductSubCategoryImg: ['']

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
      selectProductFor: ['0'],
      ProductPrice: ['', Validators.required],
      ProductDiscount: [''],
      ProductStockUnits: ['']
    });

    this.formProductImages = this.fb.group({
      productImagesUploadControl: new FormControl('', [Validators.required])

    });

    this.formTemplate = this.fb.group({
      TemplateCode: ['', Validators.required],
      TemplateName: ['', Validators.required],
      TemplateDesc: ['', Validators.required],
      TemplatePrice: ['', Validators.required],
      BalconySize: ['', Validators.required],
      templateImagesUploadControl: new FormControl('', [Validators.required])
    });


  }

  //#region  ProductCategories Actions
  onSubmitProductCategories() {
    if (this.selectedProductCategoryImage == null) {
      alert('Please upload Product Category Image!');
      return;
    }
    let formData: any = new FormData();
    formData.append("productCategoryCode", this.formProductCategories.get('ProductCategoryCode')?.value);
    formData.append("productCategoryName", this.formProductCategories.get('ProductCategoryName')?.value);
    formData.append("productCategoryDesc", this.formProductCategories.get('ProductCategoryDesc')?.value);
    formData.append("productCategoryImg", this.formProductCategories.get('ProductCategoryImg')?.value, this.selectedProductCategoryImage.name);
    formData.append("createdBy", this.socialUser);
    let postData = this.utilityService.ConvertFormDataToJson(formData);
    let productCategoryCode = this.formProductCategories.get('ProductCategoryCode')?.value;

    if (postData.length > 0) {
      this.apiService.addProductCategory(formData, productCategoryCode).subscribe((response) =>
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
      (this.toastrService.success('Product Category updated successfully!', 'Confirmation Msg!'), this.rowDataProductCategories = this.apiService.getProductCategories()),
      error => (this.toastrService.error('Product Category update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onGridReadyProductCategories(params: any): void {
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
  changeProductCategory(e: any) {
    this.productCategoryIdSelectedValue = e.value;
    this.productSubCategoryList = this.apiService.getProductSubCategories().pipe(map(itemsProductSubCategory => itemsProductSubCategory.filter(ProductSubCategory => ProductSubCategory.productCategory?._id == this.productCategoryIdSelectedValue)));
    this.productCategory._id = this.productCategoryIdSelectedValue
    this.product.productCategory = this.productCategory;

    return;
  }

  onProductCategorySelected(event: any) {
    this.selectedProductCategoryImage = event.target.files[0];
    this.formProductCategories.get('ProductCategoryImg')?.setValue(this.selectedProductCategoryImage);
  }

  //#endregion

  //#region ProductSubCategories Action

  onCellValueChangedProductSubCategories(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductSubCategory(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product SubCategory updated successfully!', 'Confirmation Msg!'), this.rowDataProductSubCategories = this.apiService.getProductSubCategories()),
      error => (this.toastrService.error('Product SubCategory update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onGridReadyProductSubCategories(params: any): void {
    this.apiProductSubCategory = params.api;
    this.columnApiProductSubCategory = params.columnApi;
    // this.apiProductSubCategory.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProductSubCategory.hideOverlay();


  }


  onSubmitProductSubCategories() {

    if (this.productCategoryIdSelectedValue == '0') {
      alert('Please select Product Category!');
      return;
    }
    else if (this.selectedProductSubCategoryImage == null) {
      alert('Please upload Product SubCategory Image!');
      return;
    }
    else {
      this.isSubmitted = true;
      let formData: any = new FormData();
      formData.append("productCategoryId", this.productCategoryIdSelectedValue)
      formData.append("productSubCategoryCode", this.formProductSubCategories.get('ProductSubCategoryCode')?.value);
      formData.append("productSubCategoryName", this.formProductSubCategories.get('ProductSubCategoryName')?.value);
      formData.append("productSubCategoryDesc", this.formProductSubCategories.get('ProductSubCategoryDesc')?.value);
      formData.append("productSubCategoryImg", this.formProductSubCategories.get('ProductSubCategoryImg')?.value, this.selectedProductSubCategoryImage.name);
      formData.append("createdBy", this.socialUser);
      let postData = this.utilityService.ConvertFormDataToJson(formData);
      let productSubCategoryCode = this.formProductSubCategories.get('ProductSubCategoryCode')?.value;

      if (postData.length > 0) {
        this.apiService.addProductSubCategory(formData, productSubCategoryCode).subscribe((response) =>
        (this.toastrService.success('Product Sub Category saved successfully!', 'Confirmation Msg!'),
          this.rowDataProductSubCategories = this.apiService.getProductSubCategories()),
          error => (this.toastrService.error('Product  SubCategory save failed!', 'Confirmation Msg!'), console.log('error'))
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


  changeProductSubCategory(e: any) {
    this.productSubCategoryIdSelectedValue = e.value;
    this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));
    this.productSubCategory._id = this.productSubCategoryIdSelectedValue;
    this.product.productSubCategory = this.productSubCategory;
    return;
  }
  onProductSubCategorySelected(event: any) {
    this.selectedProductSubCategoryImage = event.target.files[0];
    this.formProductSubCategories.get('ProductSubCategoryImg')?.setValue(this.selectedProductSubCategoryImage);
  }

  //#endregion


  //#region ProductColors Action

  onCellValueChangedProductColors(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductColor(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product Color updated successfully!', 'Confirmation Msg!'), this.rowDataProductColors = this.apiService.getProductColors()),
      error => (this.toastrService.error('Product Color update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onGridReadyProductColors(params: any): void {
    this.apiProductColor = params.api;
    this.columnApiProductColor = params.columnApi;
    //  this.apiProductColor.sizeColumnsToFit();
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

  onProductColorSelected(event: any) {
    this.selectedProductColorImage = event.target.files[0];
    this.formProductColors.get('ProductColorImg')?.setValue(this.selectedProductColorImage);
  }

  changeProductColor(e: any) {
    this.productColorIdSelectedValue = e.value;
    this.ProductColor._id = this.productColorIdSelectedValue;
    this.product.productColor = this.ProductColor;
    this.productCategory._id = this.productCategoryIdSelectedValue;
    this.product.productCategory = this.productCategory;
    this.productSubCategory._id = this.productSubCategoryIdSelectedValue;
    this.product.productSubCategory = this.productSubCategory;

    this.apiService.searchProducts(this.product).subscribe(res => { this.productList = res; });;
    return;
  }


  //#endregion Product Color

  //#region Product Brands
  onSubmitProductBrands() {

    if (this.selectedProductBrandImage == null) {
      alert('Please upload Product brand Image!');
      return;
    }

    if (this.productCategoryIdSelectedValue == '0') {
      alert('Please select Product Category!');
      return;
    }

    if (this.productSubCategoryIdSelectedValue == '0') {
      alert('Please select Product SubCategory!');
      return;
    }

    let formData: any = new FormData();
    formData.append("productCategoryId", this.productCategoryIdSelectedValue);
    formData.append("productSubCategoryId", this.productSubCategoryIdSelectedValue);
    formData.append("productBrandCode", this.formProductBrands.get('ProductBrandCode')?.value);
    formData.append("productBrandName", this.formProductBrands.get('ProductBrandName')?.value);
    formData.append("productBrandDesc", this.formProductBrands.get('ProductBrandDesc')?.value);
    formData.append("productBrandImg", this.formProductBrands.get('ProductBrandImg')?.value, this.selectedProductBrandImage.name);
    formData.append("createdBy", this.socialUser);
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

  onGridReadyProductBrands(params: any): void {
    this.apiProductBrand = params.api;
    this.columnApiProductBrand = params.columnApi;
    //  this.apiProductBrand.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProductBrand.hideOverlay();

  }

  onCellValueChangedProductBrands(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProductBrand(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product Brand updated successfully!', 'Confirmation Msg!'), this.rowDataProductBrands = this.apiService.getProductBrands()),
      error => (this.toastrService.error('Product Brand update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }
  onProductBrandSelected(event: any) {
    this.selectedProductBrandImage = event.target.files[0];
    this.formProductBrands.get('ProductBrandImg')?.setValue(this.selectedProductBrandImage);
  }

  changeProductBrand(e: any) {
    this.productBrandIdSelectedValue = e.value;
    this.productBrand._id = this.productBrandIdSelectedValue;
    this.product.productBrand = this.productBrand;
    this.productColorList = this.apiService.getProductColors();
    this.apiService.getProductImagesByProductId(this.productIdSelectedValue).subscribe(res => { this.imagesList = res })
    return;
  }
  //#endregion Product Brands


  //#region  Products

  changeProduct(e: any) {
    this.productIdSelectedValue = e.value;
    this.apiService.getProductImagesByProductId(this.productIdSelectedValue).subscribe(res => { this.imagesList = res })
    return;
  }

  onCellValueChangedProducts(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateProduct(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Product  updated successfully!', 'Confirmation Msg!'), this.rowDataProducts = this.apiService.getProducts()),
      error => (this.toastrService.error('Product  update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }

  onGridReadyProducts(params: any): void {
    this.apiProduct = params.api;
    this.columnApiProduct = params.columnApi;
    // this.apiProduct.sizeColumnsToFit();
    // temp fix until AG-1181 is fixed
    this.apiProduct.hideOverlay();
  }
  get returnFormProductsImagesControls() {
    return this.formProductImages.controls;
  }

  onProductSelected(event: any) {
    this.selectedProductImage = event.target.files[0];
    this.formProducts.get('ProductImg')?.setValue(this.selectedProductImage);


  }


  onProductImagesSelected(event: any) {
    if (this.productIdSelectedValue === undefined || this.productSubCategoryIdSelectedValue === undefined || this.productCategoryIdSelectedValue === undefined || this.productBrandIdSelectedValue === undefined || this.productColorIdSelectedValue === undefined) {
      alert('Some Selectios(s) not done!')
      return;
    }
    this.images = []
    this.fileSource = event.target.files

    if (this.fileSource && this.fileSource[0]) {

      var filesAmount = this.fileSource.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.images.push(e.target.result);

        };

        reader.readAsDataURL(this.fileSource[i]);
      }
    }

  }



  onSubmitProducts() {
    if (this.selectedProductImage == null) {
      alert('Please upload Product Image!');
      return;
    }

    if (this.productCategoryIdSelectedValue == '0') {
      alert('Please select Product Category!');
      return;
    }

    if (this.productSubCategoryIdSelectedValue == '0') {
      alert('Please select Product SubCategory!');
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
    formData.append("productPrice", this.formProducts.get('ProductPrice')?.value);
    formData.append("productDiscount", this.formProducts.get('ProductDiscount')?.value);
    formData.append("productStockUnits", this.formProducts.get('ProductStockUnits')?.value);
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
    var selectedData = this.apiProduct.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteDialog()) {

        this.apiService.deleteProductImagesByProductId(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
        (this.toastrService.success('Product images  deleted successfully!',
          'Confirmation Msg!'), this.rowDataProducts = this.apiService.getProducts()),
          error => (this.toastrService.error('Product images delete failed!', 'Confirmation Msg!'), console.log('error'))
        )

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


  resetAllDropDowns() {
    this.formProducts.patchValue({
      selectProductFor: 'Choose Product For',
    });

  }

  loadProductsSetup(params: any) {
    this.productCategoryIdSelectedValue = null;
    this.productSubCategoryIdSelectedValue = null;
    this.productBrandIdSelectedValue = null;
    this.productColorIdSelectedValue = null;

    if (params.index == 0) {
      this.rowDataProductCategories = this.apiService.getProductCategories();
      this.apiProductCategory.sizeColumnsToFit();
    }
    else if (params.index == 1) {
      this.rowDataProductSubCategories = this.apiService.getProductSubCategories();
      this.apiProductSubCategory.sizeColumnsToFit();
    }
    else if (params.index == 2) {
      this.rowDataProductColors = this.apiService.getProductColors();
      this.apiProductColor.sizeColumnsToFit();
    }
    else if (params.index == 3) {
      this.rowDataProductBrands = this.apiService.getProductBrands();
      this.apiProductBrand.sizeColumnsToFit();
    }
    else if (params.index == 4) {
      this.rowDataProducts = this.apiService.getProducts();
      this.apiProduct.sizeColumnsToFit();
      this.ngOnInit()

      this.productSubCategoryList = this.apiService.getProductSubCategories().pipe(map(itemsProductSubCategory => itemsProductSubCategory.filter(ProductSubCategory => ProductSubCategory.productCategory?._id == this.productCategoryIdSelectedValue)));
      this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));
    }
    else if (params.index == 5) {
      this.ngOnInit()

      this.productSubCategoryList = this.apiService.getProductSubCategories().pipe(map(itemsProductSubCategory => itemsProductSubCategory.filter(ProductSubCategory => ProductSubCategory.productCategory?._id == this.productCategoryIdSelectedValue)));
      this.productBrandList = this.apiService.getProductBrands().pipe(map(itemsProductBrand => itemsProductBrand.filter(ProductBrand => ProductBrand.productSubCategory._id == this.productSubCategoryIdSelectedValue)));
    }

    this.selectedColor = "Choose Product Color";



  }

  onSubmitProductImages() {
    if (this.fileSource) {
      if (this.imagesList) {

        for (let y = 0; y < this.imagesList.length; y++) {
          let counterDelete = y + 1
          this.apiService.deleteProductImages(this.imagesList[y]._id).subscribe((response) => ((this.toastrService.success('Product Image ' + counterDelete + ' deleted successfully!', 'Confirmation Msg!')),
            this.formProductImages.reset(), (this.images = []), this.apiService.getProductImagesByProductId(this.productIdSelectedValue).subscribe(res => { this.imagesList = res })),
            error => (this.toastrService.error('Product Image ' + counterDelete + ' deletion failed!', 'Confirmation Msg!'), console.log('error'), (this.images = []))

          )
        }
      }



      for (let i = 0; i < this.fileSource.length; i++) {


        this.formData.append("productCategoryId", this.productCategoryIdSelectedValue);
        this.formData.append("productSubCategoryId", this.productSubCategoryIdSelectedValue);
        this.formData.append("productBrandId", this.productBrandIdSelectedValue);
        this.formData.append("productColorId", this.productColorIdSelectedValue);
        this.formData.append("productId", this.productIdSelectedValue);
        this.formData.append("productImgCounter", i + 1);
        this.formData.append("productImg", this.fileSource[i]);
        this.formData.append("createdBy", this.socialUser);
        let postData = this.utilityService.ConvertFormDataToJson(this.formData);

        let counter = i + 1
        if (postData.length > 0) {
          this.apiService.addProductImages(this.formData, this.productIdSelectedValue).subscribe((response) =>
          (this.toastrService.success('Product Image ' + counter + ' saved successfully!', 'Confirmation Msg!'),
            this.formProductImages.reset(), (this.images = []), this.apiService.getProductImagesByProductId(this.productIdSelectedValue).subscribe(res => { this.imagesList = res })),
            error => (this.toastrService.error('Product Image ' + counter + ' save failed!', 'Confirmation Msg!'), console.log('error'), (this.images = []))
          )
          this.resetAllDropDowns();
        }

        else {
          this.toastrService.error('Product Images save failed!', 'Confirmation Msg!');
        }
      }
    }
  }

  removeImage(i: any) {
    this.images.splice(i, 1);

  }

  //Template

  onGridReadyTemplate(params: any): void {
    this.apiTemplate = params.api;
    this.columnApiTemplate = params.columnApi;
    this.apiTemplate.hideOverlay();
  }

  get returnFormTemplateImagesControls() {
    return this.formTemplate.controls;
  }

  onTemplateImagesSelected(event: any) {
    this.images = []
    this.fileSource = event.target.files

    if (this.fileSource && this.fileSource[0]) {

      var filesAmount = this.fileSource.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.images.push(e.target.result);

        };

        reader.readAsDataURL(this.fileSource[i]);
      }
    }

  }

  onCellValueChangedTemplate(params: any) {
    if (params.oldValue === params.newValue) return;
    params.data.modifiedBy = this.socialUser;
    this.apiService.updateTemplate(JSON.stringify(params.data), params.data._id).subscribe((response) =>
      (this.toastrService.success('Template  updated successfully!', 'Confirmation Msg!'), this.rowDataTemplate = this.apiService.getAllTemplates()),
      error => (this.toastrService.error('Template  update failed!', 'Confirmation Msg!'), console.log('error'))
    )

  }

  deleteRowTemplate() {
    var selectedData = this.apiTemplate.getSelectedRows();
    if (selectedData.length > 0) {
      if (this.utilityService.ConfirmDeleteTemplateDialog()) {
       

        this.apiService.deleteTemplateImages(selectedData.find(x => x._id)["_id"]).subscribe((response) => ((this.toastrService.success('Template Images  deleted successfully!', 'Confirmation Msg!')),
        this.formTemplate.reset(), (this.templateImageLIst = [])),
        error => (this.toastrService.error('Template Images  deletion failed!', 'Confirmation Msg!'), console.log('error'), (this.images = [])))

        this.apiService.deleteTemplate(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
        (this.toastrService.success('Product  deleted successfully!',
          'Confirmation Msg!'), this.rowDataTemplate = this.apiService.getAllTemplates()),
          error => (this.toastrService.error('Product delete failed!', 'Confirmation Msg!'), console.log('error'))
        )
      }
    }
    else {
      alert('Please select a row!');
    }
  }


  onSubmitTemplate() {
    if (this.fileSource) {
     
      this.formData.append("templateCode", this.formTemplate.get('TemplateCode')?.value);
      this.formData.append("templateName", this.formTemplate.get('TemplateName')?.value);
      this.formData.append("templateDesc", this.formTemplate.get('TemplateDesc')?.value);
      this.formData.append("templatePrice", this.formTemplate.get('TemplatePrice')?.value);
      this.formData.append("templateImg", this.fileSource[0]);
      this.formData.append("balconySize", this.formTemplate.get('BalconySize')?.value);
      this.formData.append("createdBy", this.socialUser);
      let postData = this.utilityService.ConvertFormDataToJson( this.formData);
      let templateCode = this.formTemplate.get('TemplateCode')?.value;

      if (postData.length > 0) {
        this.apiService.addTemplate( this.formData, templateCode).subscribe(res => {
          this.apiService.deleteTemplateImages(res._id).subscribe((response) => ((this.toastrService.success('Template Images  deleted successfully!', 'Confirmation Msg!')),
            this.formTemplate.reset(), (this.images = [])),
            error => (this.toastrService.error('Template Images  deletion failed!', 'Confirmation Msg!'), console.log('error'), (this.images = []))
          )


          for (let i = 0; i < this.fileSource.length; i++) {

            this.formData.append("templateImgCounter", i + 1);
            this.formData.append("templateImg", this.fileSource[i]);
            this.formData.append("templateId", res._id);
            this.formData.append("createdBy", this.socialUser);
            let postData = this.utilityService.ConvertFormDataToJson(this.formData);

            let counter = i + 1
            if (postData.length > 0) {
              this.apiService.addTemplateImages(this.formData, res._id).subscribe((response) =>
              (this.toastrService.success('Template Image ' + counter + ' saved successfully!', 'Confirmation Msg!'),
                this.formProductImages.reset(), (this.images = []), this.apiService.getProductImagesByProductId(this.productIdSelectedValue).subscribe(res => { this.imagesList = res })),
                error => (this.toastrService.error('Template Image ' + counter + ' save failed!', 'Confirmation Msg!'), console.log('error'), (this.images = []))
              )
              this.resetAllDropDowns();
            }

            else {
              this.toastrService.error('Template Images save failed!', 'Confirmation Msg!');
            }
          }

          (this.toastrService.success('Template saved successfully!', 'Confirmation Msg!'),
            this.formTemplate.reset(), this.rowDataTemplate = this.apiService.getAllTemplates())
        },
          error => (this.toastrService.error('Template save failed!', 'Confirmation Msg!'),
            console.log('error'))

        )

      }
    }
    else{
      alert('Please upload template image(s)')
    }
  }

  getTemplateImages(params:any) {
    var selectedData = this.apiTemplate.getSelectedRows();
    if (selectedData.length > 0) {
        this.apiService.getTemplateImages(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
        this.templateImageLIst= response)
    }
    else {
      alert('Please select a row!');
    }
}
}


