import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalComponent } from 'src/app/UI/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductListService } from 'src/app/services/product-list.services';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {OrderService} from 'src/app/services/order.service'
import { UtilityService } from 'src/app/services/utility.services';
import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment'
import { MiscService } from 'src/app/services/misc-service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems = [] as any;
  cartTotal = 0;
  productList = [] as any;
  product: any;
  filteredProduct: any;
  formCustomerAddress:FormGroup;
  orderRes: any;
  private fromEmail = environment.FROM_EMAIL
  constructor(private msgService: MessengerService, private cookieService: CookieService, private router: Router, private dialog: MatDialog, private productListSrvice: ProductListService,private fb: FormBuilder, private orderService: OrderService,private utilityService: UtilityService,private toastrService: ToastrService,private miscService: MiscService) {
    this.cartItems.length = 0;
  }

  ngOnInit() {
    this.createForm();
    if (localStorage.getItem('cart') != "") {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || "[]")
    }
    if (localStorage.getItem('cartTotal') != "") {
      this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') || "[]")
    }

    this.msgService.getCartDetails().subscribe((product: any) => {
      this.addProductToCart(product)
    })
  }

  createForm() {
    this.formCustomerAddress = this.fb.group({
      Email: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      CustomerName: ['', Validators.required],
      CustomerAddress: ['', Validators.required],
      Requirement: ['', Validators.required]
    });
  }

 

  addProductToCart(product: any) {

    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].id === product._id) {
        this.cartItems[i].qty++
        productExists = true
        this.recalculateTotalPrice()
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        return;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        id: product._id,
        discount: product.productDiscount,
        productName: product.productName,
        qty: 1,
        price: product.productPrice,
        productImg: product.productImg
      })

      this.recalculateTotalPrice()
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    }
  }


  removeItem(id: string) {
    this.cartItems = this.cartItems.filter((item: any) => item.id !== id);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
    this.recalculateTotalPrice()

    this.msgService.sendRemoveItemFromCart(id)

  }

  recalculateTotalPrice() {
    this.cartTotal = 0
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * (item.price * (100 - (item.discount)) / 100))
      localStorage.removeItem('cartTotal');
      localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal))
    })
  }

  clearCart() {
    this.cartItems = []
    localStorage.removeItem('cart');
    this.msgService.sendClearItemsFromCart();
  }



  onSubmitOrder(){

    if (this.cookieService.get('token') != "") {
      let formData: any = new FormData();
      formData.append("userId",this.cookieService.get('userId'))
      formData.append("status", "Order Received")
      formData.append("expectedTotalPrice",this.cartTotal)
      formData.append("requirement",this.formCustomerAddress.get("Requirement")?.value)
  
      let postData = this.utilityService.ConvertFormDataToJson(formData);
      this.orderService.addOrder(postData).subscribe(res=>{
        let formDataOrderItems: any = new FormData();
        for(let i in this.cartItems){
         
          formDataOrderItems.append("orderId", res._id )
          formDataOrderItems.append("productId", this.cartItems[i].id )

          let postDataOrderItems = this.utilityService.ConvertFormDataToJson(formDataOrderItems)
          this.orderService.addOrderItems(postDataOrderItems).subscribe(resOrderItems=>{
            console.log(resOrderItems)
          })
        }

        let formDataCustomerAddress:any = new FormData();
        formDataCustomerAddress.append("orderId", res._id )
        formDataCustomerAddress.append("name", this.formCustomerAddress.get('CustomerName')?.value )
        formDataCustomerAddress.append("address", this.formCustomerAddress.get('CustomerAddress')?.value )
        formDataCustomerAddress.append("emailId", this.formCustomerAddress.get('Email')?.value )
        formDataCustomerAddress.append("phoneNo", this.formCustomerAddress.get('PhoneNo')?.value )
       
        let postDataOrderCustomerAddress = this.utilityService.ConvertFormDataToJson(formDataCustomerAddress)
        this.orderService.addOrderCustomerAddress(postDataOrderCustomerAddress).subscribe(resOrderCustomerAddress =>{
          console.log(resOrderCustomerAddress)
        }),

       ( this.toastrService.success('Order created successfully. We have sent an email to '+  this.formCustomerAddress.get('Email')?.value + '. Your Order No is ' + res.orderId,'Confirmation Msg!')),(this.sendEmailToCustomer(res.orderId)),(this.formCustomerAddress.reset()),(this.clearCart())

      },error=> (this.toastrService.error('Order creation failed!', 'Confirmation Msg!'))

      
      )

     
     
      
    }
  
    else {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);

      });
    }
  }

  private  sendEmailToCustomer(orderNo:string){
    let formDataSendEmail: any = new FormData();
    formDataSendEmail.append("fromEmail", this.fromEmail);
    formDataSendEmail.append("toEmail", this.formCustomerAddress.get('Email')?.value);
    formDataSendEmail.append("subject", "Thanks for your order. Your order tracking number : " + " " + orderNo );
    formDataSendEmail.append("text", "Dear " + this.formCustomerAddress.get('CustomerName')?.value + ",<br/> Thanks for the booking. We will reach out to you shortly.<br/> Regards,<br/> Apna Balcony Sales Team" );
    let postData = this.utilityService.ConvertFormDataToJson(formDataSendEmail);


    if (postData.length > 0) {
      this.miscService.sendEmail(postData).subscribe((response) =>(console.log('Email to customer sent successfully!')),
   
        error => (console.log('Error in sending email to customer'))
      )
    }
    else {
      this.toastrService.error('Error in sending email to customer!', 'Confirmation Msg!');
    }

    


  }
}
