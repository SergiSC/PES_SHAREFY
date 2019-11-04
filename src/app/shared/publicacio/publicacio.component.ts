import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-publicacio',
  templateUrl: './publicacio.component.html',
  styleUrls: ['./publicacio.component.scss'],
})
export class PublicacioComponent implements OnInit {

  @Input('idp') idp: string;

  like = false; // substituir per crida a sistema per si l'usuari li ha donat a like o no
  StrNLikes = 0;
  PopoverController: any;
  NomUsuari = "Faker";
  movie = "";
  token = "";
  commentaris = {
    descrpicio: ['Incredible game with ma friends'],
    coments: [ {
         name: 'Simon Grimm',
         text: 'eaoihfasogf uoasiohSAHIO sa SFAHFusazfocSZFHCakgb a ugfguicXZFC SZFSGUZFCJHO'
        },
        {
          name: 'Simon Grimm',
          text: 'eaoihfasogf uoasiohSAHIO sa SFAHFusazfocSZFHCakgb a ugfguicXZFC SZFSGUZFCJHO'
         },
         {
          name: 'Simon Grimm',
          text: 'eaoihfasogf uoasiohSAHIO sa SFAHFusazfocSZFHCakgb a ugfguicXZFC SZFSGUZFCJHO'
         }
    ]
  };

  constructor(public popoverCtrl: PopoverController,
              public api: ApiService,
              private router: Router,
              private socialSharing: SocialSharing
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
     this.api.getpubli(this.idp, this.token).subscribe( (data: any) => {
      this.movie = 'http://sharefy.tk' + data.value.video_path;
      document.getElementById(this.idp).innerHTML="<source src=" + this.movie +" type='video/mp4'>";
    });
  }

}
