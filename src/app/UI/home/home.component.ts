import { Component, OnInit,ViewChild  } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  constructor(private msgService :MessengerService) { }

  ngOnInit(): void {
   this.msgService.sendClearProductSearch();
  }
  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {
    this.carousel.next();
  }

  stopSlider() {
    this.carousel.pause();
  }

}
