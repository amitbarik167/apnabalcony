
import { ProductCategory } from "./productCategory";
export class ProductSubCategory
{
    _id:string;
    productSubCategoryCode:string;
    isActive:boolean;
    productCategory:ProductCategory;
    productSubCategoryDesc:string;
    productSubCategoryName:string
}