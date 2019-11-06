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
  pid;
  path: string;
  gameSel: string;
  desc: string;
  newSel;
  private routeSub: Subscription;

  constructor(public api: ApiService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.pid = data.idp;
      this.path = data.video;
      this.desc = data.desc;
      this.newSel = data.game;
    });
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
      //console.log(this.games);
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
