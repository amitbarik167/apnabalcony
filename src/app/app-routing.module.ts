import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UI/home/home.component';
import { AboutUsComponent } from './UI/about-us/about-us.component';
import { ContactUsComponent } from './UI/contact-us/contact-us.component';
import { GalleryComponent } from './UI/gallery/gallery.component';
import { PolicyComponent } from './UI/policy/policy.component';
import { ProductCatalogueComponent } from './UI/product-catalogue/product-catalogue.component';
import { ProductSetupComponent } from './UI/product-setup/product-setup.component';
import { TemplateComponent } from './UI/template/template.component';
import { ProductItemDetailsComponent } from './UI/product-item-details/product-item-details.component';
import { OrderComponent } from './UI/order/order.component';
import { ConfigurationComponent } from './UI/configuration/configuration.component';
import { MyordersComponent } from './UI/myorders/myorders.component';
import { CartComponent } from './UI/cart/cart.component';
import { TemplateItemDetailsComponent } from './UI/template/template-item-details/template-item-details.component';


const routes: Routes = [{path:'', component:HomeComponent},{path:'home', component:HomeComponent}, {path:'aboutus', component:AboutUsComponent}, {path:'contactus',component:ContactUsComponent},
{path:'gallery', component:GalleryComponent}, {path:'policy', component:PolicyComponent}, {path:'productcatalogue', component: ProductCatalogueComponent},{path:'productcatalogue/{productCategoryId:id,productCategoryName:name}', component: ProductCatalogueComponent},
{path:'productsetup', component: ProductSetupComponent}, {path:'template', component:TemplateComponent},{path:'productitemdetails', component:ProductItemDetailsComponent},{path:'order', component:OrderComponent}, {path:'configuration', component:ConfigurationComponent},{path:'myorders', component:MyordersComponent}, {path:'cart', component:CartComponent},{path:'templateitemdetails', component:TemplateItemDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
