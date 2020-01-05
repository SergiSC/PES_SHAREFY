import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/shared/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

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
  @Input('created_at') creat: string;

  like = false; // substituir per crida a sistema per si l'usuari li ha donat a like o no
  esOwner = false;
  PopoverController: any;
  token: '';
  tempsPassat: String;

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
    private translate: TranslateService
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
        this.storage.get('token').then((token: any) => {
          this.api.like(data, this.idp, this.token).subscribe();
          this.api.sendNotification(data, this.username, token, 'like').subscribe();
        })
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
        this.storage.get('username').then((username: any) => {
          this.storage.get('token').then((tok: any) => {
            this.api.sendNotification(username, this.username, tok, 'share').subscribe();
          });
        });
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
    this.storage.get('lang').then(lang => {
      this.calculTempsPassat(lang);
    })

  }

  calculTempsPassat(idioma) {
    let dataCreacio = new Date(this.creat.split(' ')[0]).getTime();
    let dataActual = new Date().getTime();
    let diferenciaTemporal = dataActual - dataCreacio;
    diferenciaTemporal = diferenciaTemporal / (1000 * 3600 * 24 * 7);

    //Fa 1 setmana o més
    if (Math.trunc(diferenciaTemporal) > 0) {
      if (idioma == 'en') {
        if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURWEEK') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
        else this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURWEEKS') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
      }
      else {
        if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURWEEK')
        else this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURWEEKS')
      }
    }

    else {
      diferenciaTemporal = diferenciaTemporal * 7;
      //Fa 1 dia o més
      if (Math.trunc(diferenciaTemporal) > 0) {
        if (idioma == 'en') {
          if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURDAY') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
          else this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURDAYS') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
        }
        else {
          if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURDAY')
          else this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURDAYS')
        }
      }

      else {
        diferenciaTemporal = diferenciaTemporal * 24;
        //Fa 1 hora o més
        if (Math.trunc(diferenciaTemporal) > 0) {
          if (idioma == 'en') {
            if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURHOUR') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
            else this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURHOURS') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
          }
          else {
            if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURHOUR')
            else this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURHOURS')
          }
        }

        else {
          diferenciaTemporal = diferenciaTemporal * 60;
          //Fa 1 minut o més
          if (Math.trunc(diferenciaTemporal) > 0) {
            if (idioma == 'en') {
              if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURMIN') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
              else this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURMINS') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
            }
            else {
              if (Math.trunc(diferenciaTemporal) == 1) this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURMIN')
              else this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURMINS')
            }
          }
          else {
            diferenciaTemporal = diferenciaTemporal * 60;
            if (idioma == 'en') {
              this.tempsPassat = Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURSEC') + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA')
            }
            else {
              this.tempsPassat = this.translate.instant('PAGE.VISTAPUBLICACIO.HOURFA') + ' ' + Math.trunc(diferenciaTemporal) + ' ' + this.translate.instant('PAGE.VISTAPUBLICACIO.HOURSEC')

            }
          }
        }
      }
    }
  }

}