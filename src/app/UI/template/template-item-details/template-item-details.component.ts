import { Component, OnInit } from '@angular/core';
import { Template } from 'src/app/classes/template';  
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { interval } from 'rxjs';
import { TemplateListService } from 'src/app/services/template-list.services';

@Component({
  selector: 'app-template-item-details',
  templateUrl: './template-item-details.component.html',
  styleUrls: ['./template-item-details.component.scss']
})
export class TemplateItemDetailsComponent implements OnInit {
  templateList: Template[] = [];
  template: any;
  templateId: any;
  imagesList: any = [];
  progressbarValue = 100;
  curSec: number = 0;
  constructor(private templateService: TemplateListService, private route: ActivatedRoute, private msgService: MessengerService) {
    this.progressbarValue = 100;
   }

  ngOnInit(): void {
    this.template = new Template();
    this.templateId = this.route.snapshot.paramMap.get('templateId');
    this.template._id = this.templateId;
    this.templateService.searchTemplates(this.template).subscribe(res => { this.templateList = res; });;
    this.templateService.getTemplateImagesByTemplateId(this.templateId).subscribe(res => { this.imagesList = res })
    this.progressBar(2);
  }
  handleAddToCart(templateItem: any) {
    this.msgService.sendTemplateCartDetails(templateItem)
    this.msgService.sendTemplateCartItemsForQtyDisplay(templateItem)
  }

  private progressBar(val: any) {
    this.progressbarValue = 100;
    const time = val;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / time;
      this.curSec = sec;

      if (this.curSec === time) {
        sub.unsubscribe();
      }
    });

  }


}
