import { ProductCategory } from "./productCategory";
import {ProductSubCategory} from "./productSubCategory";

export class ProductBrand
{
    _id:string;
        productBrandCode:string;
        productBrandName:string;
        productBrandDesc:string;
        productBrandImg: string;
        isActive:boolean;
        createdBy:string;
        modifiedBy:string;
        productCategory:ProductCategory;
        productSubCategory:ProductSubCategory
}