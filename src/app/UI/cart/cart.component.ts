import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalComponent } from 'src/app/UI/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductListService } from 'src/app/services/product-list.services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service'
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
  formCustomerAddress: FormGroup;
  orderRes: any;
  private fromEmail = environment.FROM_EMAIL;
  private toEmail = environment.TO_EMAIL;
  images: any = [];
  imagesList: any = [];
  fileSource: FileList;
  constructor(private msgService: MessengerService, private cookieService: CookieService, private router: Router, private dialog: MatDialog, private productListSrvice: ProductListService, private fb: FormBuilder, private orderService: OrderService, private utilityService: UtilityService, private toastrService: ToastrService, private miscService: MiscService) {
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
   
  
  }

  createForm() {
   
    this.formCustomerAddress = this.fb.group({
      Email: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      CustomerName: ['', Validators.required],
      CustomerAddress: ['', Validators.required],
      Requirement: ['', Validators.required],
      customerHomePlanImagesUploadControl:['']
    });
  }





  removeItem(templateId:string,productId:string) {
   
    if(templateId!= undefined)
    {
    this.cartItems = this.cartItems.filter((item: any) => item.templateId !== templateId);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
    this.recalculateTotalPrice()

    this.msgService.sendRemoveTemplateItemFromCart(templateId)
    }
    if(productId!= undefined)
    {
    this.cartItems = this.cartItems.filter((item: any) => item.productId !== productId);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
    this.recalculateTotalPrice()

    this.msgService.sendRemoveProductItemFromCart(productId)
    }

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

  get returnFormProductsImagesControls() {
    return this.formCustomerAddress.controls;
  }

  onSubmitOrder() {

    if(this.cartItems.length==0){
      alert('Please add items to the cart and then submit order.')
      return;
    }

    if (this.cookieService.get('token') != "") {
      let formData: any = new FormData();
      formData.append("userId", this.cookieService.get('userId'))
      formData.append("status", "Order Received")
      formData.append("expectedTotalPrice", this.cartTotal)
      formData.append("requirement", this.formCustomerAddress.get("Requirement")?.value)

      let postData = this.utilityService.ConvertFormDataToJson(formData);
      this.orderService.addOrder(postData).subscribe(res => {
       
        for (let i in this.cartItems) {
          let formDataOrderItems: any = new FormData();
          formDataOrderItems.append("orderId", res._id)
          if(this.cartItems[i].productId != undefined){
            formDataOrderItems.append("productId", this.cartItems[i].productId)
          }
          if(this.cartItems[i].templateId != undefined){
          formDataOrderItems.append("templateId", this.cartItems[i].templateId)
          }
          formDataOrderItems.append("qty", this.cartItems[i].qty)
          let postDataOrderItems = this.utilityService.ConvertFormDataToJson(formDataOrderItems)
          this.orderService.addOrderItems(postDataOrderItems).subscribe(resOrderItems => {
            console.log(resOrderItems)
          })
        }

        if (this.fileSource != undefined){
          for (let i = 0; i < this.fileSource.length; i++) {

            let formData: any = new FormData();
            formData.append("homePlanImgCounter", i + 1);
            formData.append("homePlanImg", this.fileSource[i]);
            formData.append("orderId", res._id);
            let counter = i + 1
            let postData = this.utilityService.ConvertFormDataToJson(formData);
            if (postData.length > 0) {
              this.orderService.addOrderCustomerHomePlanImages(formData, res._id).subscribe((response) => (console.log('Customer Homeplan images uploaded successfully!')),
      
                error => (console.log('Error in uploading Homeplan images'))
              )
            }
          }
  
        }
        
        let formDataCustomerAddress: any = new FormData();
        formDataCustomerAddress.append("orderId", res._id)
        formDataCustomerAddress.append("name", this.formCustomerAddress.get('CustomerName')?.value)
        formDataCustomerAddress.append("address", this.formCustomerAddress.get('CustomerAddress')?.value)
        formDataCustomerAddress.append("emailId", this.formCustomerAddress.get('Email')?.value)
        formDataCustomerAddress.append("phoneNo", this.formCustomerAddress.get('PhoneNo')?.value)

        let postDataOrderCustomerAddress = this.utilityService.ConvertFormDataToJson(formDataCustomerAddress)
        this.orderService.addOrderCustomerAddress(postDataOrderCustomerAddress).subscribe(resOrderCustomerAddress => {
          console.log(resOrderCustomerAddress)
        }
        ),
          (this.toastrService.success('Order created successfully. We have sent an email to ' + this.formCustomerAddress.get('Email')?.value + '. Your Order No is ' + res.orderNo, 'Confirmation Msg!')), (this.sendEmailToCustomer(res.orderNo)), (this.sendEmailToApnaBalcony(res.orderNo)), (this.formCustomerAddress.reset()), (this.clearCart())

      }, error => (this.toastrService.error('Order creation failed!', 'Confirmation Msg!'))


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

  private sendEmailToCustomer(orderNo: string) {
    let formDataSendEmail: any = new FormData();
    formDataSendEmail.append("fromEmail", "noreply@apnabalcony.com");
    formDataSendEmail.append("toEmail", this.formCustomerAddress.get('Email')?.value);
    formDataSendEmail.append("subject", "Thanks for your order. Your order tracking number : " + " " + orderNo);
    formDataSendEmail.append("text", "Dear " + this.formCustomerAddress.get('CustomerName')?.value + ",<br/> Thanks for the booking. We will reach out to you shortly.<br/> Regards,<br/> Apna Balcony Sales Team");
    let postData = this.utilityService.ConvertFormDataToJson(formDataSendEmail);


    if (postData.length > 0) {
      this.miscService.sendEmail(postData).subscribe((response) => (console.log('Email to customer sent successfully!')),

        error => (console.log('Error in sending email to customer'))
      )
    }
    else {
      this.toastrService.error('Error in sending email to customer!', 'Confirmation Msg!');
    }
  }

  private sendEmailToApnaBalcony(orderNo: string) {
    let formDataSendEmail: any = new FormData();
    formDataSendEmail.append("fromEmail", "noreply@apnabalcony.com");
    formDataSendEmail.append("toEmail", this.toEmail);
    formDataSendEmail.append("subject", "Order received. Order No. : " + " " + orderNo);
    formDataSendEmail.append("text", "Dear ApnaBalcony Sales Team" + ",<br/> A new order recieved with Order No. : " + orderNo + ". Please check the details in https://apnabalcony.com/order. <br/> Regards,<br/> Apna Balcony Sales Team");
    let postData = this.utilityService.ConvertFormDataToJson(formDataSendEmail);


    if (postData.length > 0) {
      this.miscService.sendEmail(postData).subscribe((response) => (console.log('Email to customer sent successfully!')),

        error => (console.log('Error in sending email to customer'))
      )
    }
    else {
      this.toastrService.error('Error in sending email to customer!', 'Confirmation Msg!');
    }



  }

  checkIfSignedIn() {
    if (this.cookieService.get('token') == "") {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);

      });

    }
  }

  get returnCustomerHomePlanImagesControls() {
    return this.formCustomerAddress.controls;
  }

  
  onCustomerHomePlanImagesSelected(event: any) {

    this.images = []
    this.fileSource = event.target.files
    if (this.fileSource && this.fileSource[0]) {
      var filesAmount = this.fileSource.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.images.push(e.target.result);

        };

        reader.readAsDataURL(this.fileSource[i]);
      }
    }

  }
}
