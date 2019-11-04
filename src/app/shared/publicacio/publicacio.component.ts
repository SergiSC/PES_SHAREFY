import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {Storage} from '@ionic/storage';
import { ComentarisPage } from 'src/app/pages/comentaris/comentaris.page';

@Component({
  selector: 'app-publicacio',
  templateUrl: './publicacio.component.html',
  styleUrls: ['./publicacio.component.scss'],
})
export class PublicacioComponent implements OnInit {

  @Input('idp') idp: string;
  @Input('idu') idu: string;
  @Input('video') video: string;
  @Input('des') des: string;

  like = false; // substituir per crida a sistema per si l'usuari li ha donat a like o no
  StrNLikes = 0;
  PopoverController: any;
  commentaris = {
    ownername: '',
    ownerphoto: '',
    descrpicio: '',
    coments: [ {
         name: 'Simon Grimm',
         text: 'eaoihfasogf uoasiohSAHIO sa SFAHFusazfocSZFHCakgb a ugfguicXZFC SZFSGUZFCJHO',
         img: '',
        },
        {
          name: 'Simon Grimm',
          text: 'eaoihfasogf uoasiohSAHIO sa SFAHFusazfocSZFHCakgb a ugfguicXZFC SZFSGUZFCJHO',
          img: '',
         },
         {
          name: 'Simon Grimm',
          text: 'eaoihfasogf uoasiohSAHIO sa SFAHFusazfocSZFHCakgb a ugfguicXZFC SZFSGUZFCJHO',
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
    if (this.like) {this.StrNLikes += 1; } else {this.StrNLikes -= 1; }
   }

  async presentPopOver(event) {
     const popover = await this.PopoverController.create({
       Component: PubliPopOverComponent,
       event
     });
     return await popover.present();
   }


   gotoporfile() {
    this.router.navigate(['/perfil']);
   }

   gotoComments() {
    let navigationExtras: NavigationExtras = {
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
  }

}
