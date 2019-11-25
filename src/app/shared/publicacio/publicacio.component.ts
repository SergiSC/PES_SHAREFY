import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/shared/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import {Storage} from '@ionic/storage';

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
  @Input('game') game: string;

  like = false; // substituir per crida a sistema per si l'usuari li ha donat a like o no
  esOwner = false;
  PopoverController: any;
  token:"";
  commentaris = {
    idpubli: null,
    ownername: '',
    ownerphoto: '',
    descrpicio: '',
    coments: [],
  };

  constructor(public popoverCtrl: PopoverController,
              public api: ApiService,
              private router: Router,
              private socialSharing: SocialSharing,
              private storage: Storage,
               ) { }

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
       componentProps: {idPublication: this.idp, video: this.video, desc: this.des, game: this.game},
       event,
       cssClass: 'setting-popover'
     });
     return await popover.present();
   }


   gotoporfile() {
    //this.router.navigate(['/perfiluser']);
    // de moment va a la del usuari registat
    const edit = {
      nom: this.commentaris.ownername
    };
    this.router.navigate(['/perfiluser', edit]);
   }

   gotoComments() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.commentaris)
      }
    };
    this.router.navigate(['/comentaris'], navigationExtras);
   }

   gotoShare() {
     //this.router.navigate(['/compartir']);
      //TODO: mirar com compartir video o fotos
    //this.socialSharing.share("Missatge a compartir", null, null, "http://www.sharefy.tk");
    this.socialSharing.share("Check this item:  sharefy://tabs/mur/")
    .then(() => {
    
    })
    .catch(() => {
    
    });
   }


  ngOnInit() {
    this.commentaris.descrpicio = this.des.toString();
    this.commentaris.ownername = this.username;
    this.commentaris.idpubli = this.idp;
    this.commentaris.ownerphoto = this.photo;

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
