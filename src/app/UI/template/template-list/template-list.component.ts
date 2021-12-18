import { Component, OnInit } from '@angular/core';
import { Template } from 'src/app/classes/template';
import { TemplateListService } from 'src/app/services/template-list.services';
import { MessengerService } from 'src/app/services/messenger.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  page = 1;
  pageSize =6;
  templateList: Template[] = [];
  flag: boolean = false;
  progressbarValue = 100;
  curSec: number = 0;
  template: any;


  constructor(private templateService: TemplateListService, private msgService: MessengerService, private route: ActivatedRoute) {
    this.progressbarValue = 100;
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.progressBar(2);


          this.templateService.getTemplates().subscribe(res => { this.templateList = res; });
        
      })

      this.msgService.getSearchTemplateFilters().subscribe((template: any) => {
        this.templateList = [];
        this.progressBar(2);
        if (Object.keys(template).length > 0) {
      
          this.templateService.searchTemplates(template).subscribe(res => { this.templateList = res; });;
      
        }
        else {
          this.progressBar(5);
          this.templateService.getTemplates().subscribe(res => { this.templateList = res; });
        }
      
        this.flag = true;
      })
      
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
