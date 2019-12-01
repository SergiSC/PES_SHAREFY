import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  events: any;

  constructor(public api: ApiService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.api.getEvents().subscribe((data: any) => {
      this.events = data.value;
      console.log(data);
    });
  }

}
