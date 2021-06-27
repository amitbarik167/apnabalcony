import { Component, OnInit, VERSION  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  carouselItems = [
    'https://source.unsplash.com/7BLRSG-AkJs',
    'https://source.unsplash.com/rcJbbK5_iIA',
    'https://source.unsplash.com/yQUwIlUeU4o',
    'https://source.unsplash.com/MlaQmWvzRTw',
    'https://source.unsplash.com/6dTpYUcr1yg',
  ];
}
