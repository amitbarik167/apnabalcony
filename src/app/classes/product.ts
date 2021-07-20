import { ProductCategory } from "./productCategory";
import {ProductSubCategory} from "./productSubCategory";
import {ProductBrand} from "./productBrand";
import {ProductColor} from "./productColor";

export class Product
{
    _id:string;
        productCode:string;
        productName:string;
        productDesc:string;
        productImg: string;
        productPrice:number;
        productDiscount:number;
        productOffersId:number;
        productCustomerRating:number;
        productStockUnits:number;
        isActive:boolean;
        createdBy:string;
        modifiedBy:string;
        productCategory:ProductCategory;
        productSubCategory:ProductSubCategory;
        productBrand:ProductBrand;
        productColor:ProductColor;
}