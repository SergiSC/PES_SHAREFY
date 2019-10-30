import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from 'src/app/publi-pop-over/publi-pop-over.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacio',
  templateUrl: './publicacio.component.html',
  styleUrls: ['./publicacio.component.scss'],
})
export class PublicacioComponent implements OnInit {

  idp = "";
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


  ngOnInit() {
     this.api.getpubli(7, this.token).subscribe( (data: any) => {
      this.movie = 'http://sharefy.tk' + data.value.video_path;
      document.getElementById('v').innerHTML="<source src=" + this.movie +" type='video/mp4'>";
    });
  }

}
