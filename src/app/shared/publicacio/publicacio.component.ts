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
  like = false;
  StrNLikes = 0;
  PopoverController: any;
  NomUsuari = "Faker";
  movie = "";
  token = "";

  commentaris: any[] = [
    {
      'name': 'Tete',
      'photo': '',
      'text': 'Como mola'
    },
    {
      'name': 'Paker666',
      'photo': '',
      'text': 'inreible'
    }
  ];

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

   /*startvideo() {
    let opcions: StreamingVideoOptions = {
      successCallback: () => { console.log(); },
      errorCallback: () => {console.log(); },
      orientation: 'portrait'
    }
    this.StreamingMedia.playVideo( 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4' , opcions);
   }
   */

   gotoporfile(){ 

   }

   gotoComments() {
     this.router.navigateByUrl('../pages/comentaris');
     console.log('hello');
   }

  ngOnInit() {
    this.api.getpubli(22, this.token).subscribe( (data: any) => {
      this.movie = data.value.video_path;
    });
  }

}
