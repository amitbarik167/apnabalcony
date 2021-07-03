import { BrowserModule } from '@angular/platform-browser';
import { NgModule   } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider , FacebookLoginProvider} from 'angularx-social-login';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageFormatterComponent } from "./image-formatter-component";
import {AgGridModule} from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import {UtilityService} from './services/utility.services';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductSetupService } from './services/product-setup.services';
import { ProductSetupComponent } from './UI/product-setup/product-setup.component';
import { CarouselModule } from 'ngx-acuw';
import { HomeComponent } from './UI/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductSetupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SocialLoginModule,
    AppRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    NgSelectModule,
    AgGridModule,
    ToastrModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    ToastrModule.forRoot(), // ToastrModule added
    AgGridModule.withComponents([ImageFormatterComponent]),
    CarouselModule
    
    
  ],
 
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1026314008032-mt0cnk7inteb9rurifdha9souq2ksj3m.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    } , ProductSetupService,UtilityService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


