import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PolicyComponent } from './policy/policy.component';
import { ProductcatalogueComponent } from './productcatalogue/productcatalogue.component';
import { ProductsetupComponent } from './productsetup/productsetup.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [{path:'home', component:HomeComponent}, {path:'aboutus', component:AboutusComponent}, {path:'contactus',component:ContactusComponent},
{path:'gallery', component:GalleryComponent}, {path:'policy', component:PolicyComponent}, {path:'productcatalogue', component: ProductcatalogueComponent}, 
{path:'productsetup', component: ProductsetupComponent}, {path:'template', component:TemplateComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
