import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  data: any;
  follo = undefined;
  tefollow = undefined;
  vectorfollow;
  constructor(private route: ActivatedRoute, private api: ApiService, private store: Storage) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const com  = JSON.parse(params.special);
      this.data = com;
      if (com[1] === 'Followers') {
        this.follo = true;
      } else {this.follo = false; }

      this.store.get('token').then((token) => {
        if (this.follo) {
          this.api.Followers(com[0], token).subscribe((followers: any) => {
            this.vectorfollow = followers.followers;
            this.tefollow = true;
          }, err => {
            this.tefollow = false;
          });
        } else {
          this.api.Following(com[0], token).subscribe((followers: any) => {
            this.vectorfollow = followers.followers;
            this.tefollow = true;
          }, err => {
            this.tefollow = false;
          });
        }
      });
    });
  }
}
