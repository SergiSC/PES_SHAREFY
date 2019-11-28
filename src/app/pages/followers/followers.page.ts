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
  follower = false;
  tefollower = true;

  following = false;
  tefollowing = true;

  likes = false;
  telikes = true;

  vectorfollow;
  constructor(private route: ActivatedRoute, private api: ApiService, private store: Storage) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const com  = JSON.parse(params.special);
      this.data = com;
      if (com[1] === 'Followers') {
        this.follower = true;
      } else if (com[1] === 'Following') {
        this.following = true;
      } else if (com[1] === 'Likes') {
        this.likes = true;
      }
      this.store.get('token').then((token) => {
        if (this.follower) {
          this.api.Followers(com[0], token).subscribe((followers: any) => {
            this.vectorfollow = followers.followers;
          }, err => {
            this.tefollower = false;
          });
        } else if (this.following) {
          this.api.Following(com[0], token).subscribe((followers: any) => {
            this.vectorfollow = followers.followed;
          }, err => {
            this.tefollowing = false;
          });
        } else if (this.likes) {
          this.vectorfollow = com[2];
          if (this.vectorfollow.length === 0) {
            this.telikes = false;
          }
        }
      });
    });
  }
}
