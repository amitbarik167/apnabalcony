import { ProductCategory } from "./productCategory";
import {ProductSubCategory} from "./productSubCategory";

export class ProductBrand
{
    _id:string;
        productBrandCode:string;
        productBrandName:string;
        productBrandDesc:string;
        productBrandImg: string;
        isActive:Boolean;
        createdBy:String;
        modifiedBy:String;
        productCategory:ProductCategory;
        productSubCategory:ProductSubCategory
}