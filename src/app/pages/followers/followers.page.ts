import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private store: Storage) {}

  ionViewWillEnter() {
    this.vectorfollow = [];
    this.follower = false;
    this.tefollower = true;

    this.following = false;
    this.tefollowing = true;

    this.likes = false;
    this.telikes = true;

    this.route.params.subscribe(data => {
      const nom = data.nom;
      const tipus = data.type;
      if (tipus === 'Followers') {
        console.log('caca');
        this.follower = true;
      } else if (tipus === 'Following') {
        this.following = true;
        console.log('culo');
      } else if (tipus === 'Likes') {
        this.likes = true;
      }
      this.store.get('token').then((token) => {
        if (this.follower) {
          this.api.Followers(nom, token).subscribe((followers: any) => {
            this.vectorfollow = followers.followers;
          }, err => {
            console.log(err);
            this.tefollower = false;
          });
        } else if (this.following) {
          this.api.Following(nom, token).subscribe((followers: any) => {
            this.vectorfollow = followers.followed;
          }, err => {
            this.tefollowing = false;
          });
        } else if (this.likes) {
          this.api.getLikesPubliId(nom, token).subscribe((followers: any) => {
            this.vectorfollow = followers.users;
            if (this.vectorfollow.length === 0) {
              this.telikes = false;
            }
          }, err => {
            this.telikes = false;
          });
        }
      });
    });
  }

  gotoporfile(name) {
    const edit = {
      nom: name
    };
    this.router.navigate(['/perfiluser', edit]);
   }
}
