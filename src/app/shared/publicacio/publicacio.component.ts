import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-publicacio',
  templateUrl: './publicacio.component.html',
  styleUrls: ['./publicacio.component.scss'],
})
export class PublicacioComponent implements OnInit {

  like = false;
  StrNLikes = '0';
  nLikes = 0;

  constructor(public popoverCtrl: PopoverController,
              private StreamingMedia: StreamingMedia) { }

  blike() {
    this.like = !this.like;
    if (this.like) {this.nLikes += 1; } else {this.nLikes -= 1; }
    this.StrNLikes = this.nLikes.toString();
   }

   startvideo() {
    let opcions: StreamingVideoOptions = {
      successCallback: () => { console.log(); },
      errorCallback: () => {console.log(); },
      orientation: 'portrait'
    }
    this.StreamingMedia.playVideo( 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4' , opcions);
   }

   gotoporfile(){ 

   }

  ngOnInit() {}

}
