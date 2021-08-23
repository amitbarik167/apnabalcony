import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private msgService :MessengerService) { }

  ngOnInit(): void {
    this.msgService.sendClearProductSearch();
  }

}
