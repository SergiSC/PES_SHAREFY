import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/shared/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-publicacio',
  templateUrl: './publicacio.component.html',
  styleUrls: ['./publicacio.component.scss'],
})
export class PublicacioComponent implements OnInit {

  @Input('idp') idp: string;
  @Input('username') username: string;
  @Input('video') video: string;
  @Input('des') des: string;
  @Input('numLikes') numLikes: number;
  @Input('photo') photo: string;

  like = false; // substituir per crida a sistema per si l'usuari li ha donat a like o no
  esOwner = false;
  PopoverController: any;
  token: '';

  commentaris = {
    idpubli: null,
    ownername: '',
    ownerphoto: '',
    descrpicio: '',
    coments: [],
  };
  vlikes;

  constructor(public popoverCtrl: PopoverController,
    public api: ApiService,
    private router: Router,
    private socialSharing: SocialSharing,
    private storage: Storage,
  ) { }

  
  onPlayingVideo(event) {
    event.preventDefault();
    console.log(event);
    console.log(event.target.autoplay);
    if (event.target.autoplay) {
      event.target.autoplay = false;
      event.target.pause();
    }
  }

  blike() {
    this.like = !this.like;
    if (this.like) {
      this.numLikes += 1;
      this.storage.get('username').then((data: any) => {
        this.api.like(data, this.idp, this.token).subscribe();
      });

    } else {
      this.numLikes -= 1;
      this.storage.get('username').then((data: any) => {
        this.api.dislike(data, this.idp, this.token).subscribe();
      });
    }
  }

  async presentPopOver(event) {
    const popover = await this.popoverCtrl.create({
      component: PubliPopOverComponent,
      componentProps: { idPublication: this.idp, video: this.video, desc: this.des },
      event,
      cssClass: 'setting-popover'
    });
    return await popover.present();
  }


  gotoporfile() {
    const edit = {
      nom: this.commentaris.ownername
    };
    this.router.navigate(['/perfiluser', edit]);
  }

  gotolikes() {
    const edit = {
      nom: this.idp,
      type: 'Likes'
    };
    this.router.navigate(['/followers', edit]);
  }

  gotoComments() {

    const edit = {
      id: this.idp,
      des: this.des,
      name: this.username,
      photo: this.photo
    };
    this.router.navigate(['/comentaris', edit]);
    /*
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.commentaris)
      }
    };
    this.router.navigate(['/comentaris'], navigationExtras);
    */
  }

  gotoShare() {
    this.socialSharing.share("Check this item:  sharefy://tabs/mur/")
      .then(() => {

      })
      .catch(() => {

      });
  }


  ngOnInit() {
    let element = <HTMLMediaElement>document.getElementById('video');
    element.muted = true;

    this.commentaris.descrpicio = this.des.toString();
    this.commentaris.ownername = this.username;
    this.commentaris.idpubli = this.idp;
    this.commentaris.ownerphoto = this.photo;

    this.api.getPublicationById(this.idp).subscribe((data4: any) => {
      this.vlikes = data4.value.likes;
    });

    this.storage.get('username').then((val) => {
      if (this.commentaris.ownername === val) {
        this.esOwner = true;
      }
      this.storage.get('token').then((token) => {
        this.api.getLike(val, token, this.idp).subscribe((data: any) => {
          this.like = data.value === 'true';
        });
      });

    });

  }

}