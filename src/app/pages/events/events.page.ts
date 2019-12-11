import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  events: any;

  constructor(public api: ApiService,
              private translate: TranslateService,
              private store: Storage,
              private router: Router) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.api.getEvents().subscribe((data: any) => {
      this.events = data;
    });
  }

  gotoperfiluser() {
    this.store.get('username').then((val) => {
      const edit = {
        nom: val
      };
      this.router.navigate(['/perfiluser', edit]);
    });
  }

}
