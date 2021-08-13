import { Component, OnInit } from '@angular/core';
import {UserAuthService} from 'src/app/services/user-authorization.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ProductListService } from 'src/app/services/product-list.services';
import { Product } from 'src/app/classes/product';
import { FormControl } from '@angular/forms';
import { MessengerService } from 'src/app/services/messenger.service';
import { ModalComponent } from 'src/app/UI/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  loginForm?: FormGroup;
  socialUser?: SocialUser;
  isLoggedin?: boolean;  
  isNotLoggedin?:boolean;
  isLoginNotClicked?:boolean=false;
  userId?:string;
  authorizationToken?:string
  productList : Product[] = [];
  productSearchControl:  FormControl;
  autoProductFilter: Observable<Product[]>;
  product:Product;
  isEventFired:boolean=false;
  cartItems = [] as any;

  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private userAuthService : UserAuthService,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private router: Router,
    private productService : ProductListService,
    private msgServicice :MessengerService,
    private dialog: MatDialog,
    private location: Location,
    private cookieService: CookieService,
    private msgService : MessengerService
  ) { 
    this.productSearchControl = new FormControl();
    this.productService.getProducts().subscribe(res=> {this.productList=res;});
    this.cartItems.length =0;


  }
 

  ngOnInit(){

    if(this.cookieService.get('cart') != ""){
      this.cartItems = JSON.parse(this.cookieService.get('cart'))
    }

        this.msgService.getCartItemsForQtyDisplay().subscribe((product: any) => {
         this.addCartQty(product)
      })

      this.msgServicice.getRemoveItemFromCart().subscribe((id:any) => {
        this.cartItems = this.cartItems.filter((item:any) => item.id !== id);
      })

      this.msgService.getClearItemFromCart().subscribe(() =>{
        this.cartItems = []
      })
   
    if(this.location.path().indexOf('/productsetup') >-1){
      this.router.navigate(['/home'])
    }

  
    this.isNotLoggedin = true;
    
    this.productService.getProducts().subscribe(res=> {this.productList=res;});
    this.autoProductFilter = this.productSearchControl.valueChanges
    .pipe(
      startWith(''),
      map(products => products? this.mat_filter(products): this.productList.slice())
    );

       
   this.cookieService.deleteAll();
  this.socialAuthService.initState.subscribe(value=> {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user=>{
    
      console.log('GoogleContainerComponent.ngOnInit user:', user)
      });
      });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);

    if(this.socialUser != null){
      this.isNotLoggedin=false;
      this.userAuthService.addUserAuthorization(this.socialUser.email,{userId : this.socialUser?.email, authorizationToken : this.socialUser?.authToken})
      .subscribe((response:any) =>
      (this.cookieService.set('token',  response['token']),
      this.cookieService.set('authorizationToken',this.socialUser?.authToken as string),this.cookieService.set('userId', this.socialUser?.email as string)),
      (this.toastrService.success('User Signed in successfully!', 'Confirmation Msg!'), 
      error => (this.toastrService.error('User Sign in failed!', 'Confirmation Msg!'), console.log('error'))
      ))
    }
  });
}


 addCartQty(product:any){
  let productExists = false
  for (let i in this.cartItems){
    if(this.cartItems[i].id === product._id){
     this.cartItems[i].qty++
   console.log("Length", this.cartItems.length)
   break;
     }
   }

   if(!productExists){
    this.cartItems.push({
      id: product._id,
      discount: product.productDiscount,
      productName : product.productName,
      qty:1,
      price:product.productPrice
    })
}
 }
  
private mat_filter(value: string): Product[] {
    return this.productList.filter(option => option.productName.toLowerCase().indexOf(value.toLowerCase()) === 0);
}  

ngOnDestroy(){

 this.cookieService.deleteAll()
  
  }
  
 
  loginWithGoogle(): void {
    if(this.router.url.indexOf('/productcatalogue')>-1){
      
    }else{
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.isLoginNotClicked = true;
  
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = (user != null);
        console.log(this.socialUser);})
    
    }

  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isNotLoggedin=true;
    this.cookieService.deleteAll()

  }
  onEnter(evn:any){
  
   setTimeout(() => {
    console.log('sleep');
    if(this.router.url.indexOf('/productcatalogue')>-1){
      this.product = new Product();
      this.product.productName = evn.option.value
      this.msgServicice.sendSearchFilters(this.product );
   
    }
    else{
      this.router.navigate(['/productcatalogue',{searchedProductName:evn.option.value}]);
    }
    // And any other code that should run only after 5s
  }, 2000);
    
  }

  getAllProducts(searchParams:string){
    if(searchParams==''){
      this.product = new Product();
      this.msgServicice.sendSearchFilters(this.product );
    }
 
  }

  openDialogIfNotLoggedIn(): void {
if(this.cookieService.get('token') != null){
  this.router.navigate(['/productsetup'])
}
else{
  const dialogRef = this.dialog.open(ModalComponent, {
    width: '250px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
   
  });
}
}

openCart(){
  this.router.navigate(['/productcatalogue'])
}




}