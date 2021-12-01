import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Template } from 'src/app/classes/template';
import { TemplateListService } from 'src/app/services/template-list.services';
import { NgxCaptureService } from 'ngx-capture';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {


  cartItems = [] as any;
  template: Template;
  templateIsEmpty: any;
  templateList: Template[] = [];
  @ViewChild('screenshot', { static: false }) screenshot: ElementRef;
  @ViewChild('tabs') tabGroup: MatTabGroup;

  constructor(private renderer: Renderer2,private el:ElementRef, private templateService: TemplateListService, private captureService: NgxCaptureService, private router: Router,) {

    this.cartItems.length = 0;
  }
  image: any;
  angle: any = 0;
  page = 1;
  pageSize = 1;
  name = 'Angular';
  fileToUpload: any;
  imageUrl: any;
  draggables: CdkDrag<any>[] = [];
  selectedIndex: number;

  ngOnInit(): void {

   // this.image = this.screenshot.nativeElement;

    if (localStorage.getItem('cart') != "") {
      this.cartItems = JSON.parse(localStorage.getItem('cart') || "[]")
    }
    this.template = new Template();
    this.template.isEmpty = true;
    this.templateIsEmpty = this.template;
    this.templateService.searchTemplates(this.templateIsEmpty).subscribe(res => { this.templateList = res; });;
  }

  ngAfterViewInit() {
    this.image = this.screenshot.nativeElement;

  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  capture() {
   
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['/template'])
  this.selectedIndex=1;

    

  }
  drop(ev: any): void {
   
    // if (!this.draggables.find(f => f == ev.source)) {
    //   this.draggables.push(ev.source);
    // }
    // const draggedImage = this.renderer.createElement('img');
    // draggedImage.src = ev.source.element.nativeElement.firstChild.currentSrc;
    // this.renderer.appendChild(this.screenshot.nativeElement,draggedImage);
    //  this.image = this.screenshot.nativeElement;
    // this.screenshot.nativeElement.innerHTML;
    // this.image = this.screenshot.nativeElement;
  }
}
