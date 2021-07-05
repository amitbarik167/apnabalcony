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
        productPrice:Number;
        productSize:String;
        productFor: String;
        productDiscount:Number;
        productOffersId:Number;
        productCustomerRating:Number;
        productOccasion:String;
        productFit:String;
        isActive:Boolean;
        createdBy:String;
        modifiedBy:String;
        productCategory:ProductCategory;
        productSubCategory:ProductSubCategory;
        productBrand:ProductBrand;
        productColor:ProductColor;
}