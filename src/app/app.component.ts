import { Component, OnInit } from '@angular/core';
import {UserAuthService} from 'src/app/services/user-authorization.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Routes } from '@angular/router';

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

  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private userAuthService : UserAuthService,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() :void{
    this.isNotLoggedin = true;

  localStorage.clear();
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
      (localStorage.setItem('token',  response['token']),
      localStorage.setItem('authorizationToken',this.socialUser?.authToken as string),localStorage.setItem('userId', this.socialUser?.email as string)),
      (this.toastrService.success('User Signed in successfully!', 'Confirmation Msg!'), 
      error => (this.toastrService.error('User Sign in failed!', 'Confirmation Msg!'), console.log('error'))
      ))
    }
  });
}
  

ngOnDestroy(){

 localStorage.clear();
  
  }
  

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.isLoginNotClicked = true;
  ;
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.isNotLoggedin=true;
    localStorage.clear();

  }
 

}