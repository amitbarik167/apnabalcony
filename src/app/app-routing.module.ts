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


const routes: Routes = [{path:'', component:HomeComponent},{path:'home', component:HomeComponent}, {path:'aboutus', component:AboutUsComponent}, {path:'contactus',component:ContactUsComponent},
{path:'gallery', component:GalleryComponent}, {path:'policy', component:PolicyComponent}, {path:'productcatalogue', component: ProductCatalogueComponent},
{path:'productsetup', component: ProductSetupComponent}, {path:'template', component:TemplateComponent},{path:'productitemdetails', component:ProductItemDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
