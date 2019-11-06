import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-publicacio',
  templateUrl: './edit-publicacio.page.html',
  styleUrls: ['./edit-publicacio.page.scss'],
})
export class EditPublicacioPage implements OnInit {

  games: any;
  publicacio;
  path: string;
  gameSel: string;
  desc: string;
  newSel;
  private routeSub: Subscription;

  constructor(public api: ApiService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.api.getPublicationById(params['idPublicacio']).subscribe((data:any) => {
        this.publicacio = data.value;
        console.log(this.publicacio);
        this.path = this.publicacio.video_path;
        console.log(this.path);
        this.newSel = this.publicacio.game.name;
        this.desc = this.publicacio.text;
      });
    });
    this.api.getAllGames().subscribe((data:any) => {
      this.games = data.value;
      console.log(this.games);
    });
  }

  cambiJoc(){
    console.log(this.newSel);
  }

  /*save() {
    console.log(this.games.)
    this.api.editarPublicacio()
  }*/

}
