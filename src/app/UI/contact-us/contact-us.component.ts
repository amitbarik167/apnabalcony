import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.services';
import { MiscService } from 'src/app/services/misc-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment'
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  formContactus:FormGroup;
  private toEmail= environment.TO_EMAIL
  constructor(private fb: FormBuilder, private utilityService: UtilityService,private miscService: MiscService,private toastrService: ToastrService,private msgService :MessengerService) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.msgService.sendClearProductSearch();
    this.formContactus = this.fb.group({
      Email: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      Customername: ['', Validators.required],
      Msgus: ['', Validators.required]
    });
  }



    onSubmitContactus() {
    let formData: any = new FormData();
    formData.append("fromEmail",this.formContactus.get('Email')?.value);
    formData.append("toEmail", this.toEmail);
    formData.append("subject", "Enquiry: " + " " + this.formContactus.get('Customername')?.value + " " + "Email:" + this.formContactus.get('Email')?.value + " " + "Contact:" +this.formContactus.get('PhoneNo')?.value );
    formData.append("text", this.formContactus.get('Msgus')?.value);
    let postData = this.utilityService.ConvertFormDataToJson(formData);
  

    if (postData.length > 0) {
      this.miscService.sendEmail(postData).subscribe((response) =>
        (this.toastrService.success('Enquiry sent successfully!', 'Confirmation Msg!'),
          this.formContactus.reset()),
        error => (this.toastrService.error('Enquiry sending failed!', 'Confirmation Msg!'), console.log('error'))
      )
    }
    else {
      this.toastrService.error('Enquiry sending failed!', 'Confirmation Msg!');
    }
  }
}
