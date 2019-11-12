import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/shared/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {Storage} from '@ionic/storage';
import { ComentarisPage } from 'src/app/pages/comentaris/comentaris.page';
import { Key } from 'protractor';

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
    ownername: '',
    ownerphoto: '',
    descrpicio: '',
    coments: [ {
         name: 'Simon Grimm',
         text: 'Dios vaya passada de partit que es aixo loco',
         img: '',
        },
        {
          name: 'Venyto Camela',
          text: 'Vaya caca de clip mi madre hace eso con una mano en la paella y la otra en la fregona',
          img: '',
         },
         {
          name: 'Hittler',
          text: 'Hay q quemarlo todo',
          img: '',
         }
    ]
  };

  constructor(public popoverCtrl: PopoverController,
              public api: ApiService,
              private router: Router,
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
       componentProps: {idPublication: this.idp},
       event,
       cssClass: 'setting-popover'
     });
     return await popover.present();
   }


   gotoporfile() {
    this.router.navigate(['/perfil']);
    // de moment va a la del usuari registat
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
     this.router.navigate(['/compartir']);
   }


  ngOnInit() {
    this.commentaris.descrpicio = this.des.toString();
    this.commentaris.ownername = this.username;

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
