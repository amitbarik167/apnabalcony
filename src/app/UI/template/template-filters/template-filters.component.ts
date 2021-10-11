import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Template } from 'src/app/classes/template';
import { TemplateListService } from 'src/app/services/template-list.services';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-template-filters',
  templateUrl: './template-filters.component.html',
  styleUrls: ['./template-filters.component.scss']
})
export class TemplateFiltersComponent implements OnInit {
  template: Template;
  formTemplateFilters: FormGroup;

  constructor(private templateService: TemplateListService, private msgServicice: MessengerService, private fb: FormBuilder) { 

  }

  ngOnInit(): void {
  }


  
  reset() {

   

}


onInputChangePrice(event: any) {
  if (event.value > 0) {
    this.template.templatePrice = event.value;
    this.msgServicice.sendSearchTemplateFilters(this.template);
  }
  else if (event.value == 0) {
    this.template = new Template();
    this.msgServicice.sendSearchTemplateFilters(this.template);
  }

}

keyup(event:any){
  
  if(event.target.value.length > 0)
  {
    this.template = new Template();
    this.template.balconySize = event.target.value;
    this.msgServicice.sendSearchTemplateFilters(this.template);

  }
 else{
  this.template = new Template();
  this.msgServicice.sendSearchTemplateFilters(this.template);

 }
 
  }



}
