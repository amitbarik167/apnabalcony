import { Component } from "@angular/core";
import { Injectable } from "@angular/core";

@Component({
  selector: 'app-image-formatter-cell',
  template: `<img border="0" width="100%" height="100%" src=\"data:image/png;base64,{{ params.value }}\">` })


  @Injectable({
    providedIn: 'root'
})

export class ImageFormatterComponent {
  params: any;
  agInit(params: any){
    this.params = params; 
  } 
}