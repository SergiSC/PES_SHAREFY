import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-editar-publicacio',
  templateUrl: './editar-publicacio.page.html',
  styleUrls: ['./editar-publicacio.page.scss'],
})

export class EditarPublicacioPage implements OnInit {

  games: any;
  pid;
  path: string;
  desc: string;
  newSel;
  newDesc;
  private routeSub: Subscription;

  constructor( private translate: TranslateService, public api: ApiService, private route: ActivatedRoute, private storage: Storage) {
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


  save() {
      if (this.newDesc != null) {
        this.storage.get('token').then((data: any) => {
          this.api.editarPublicacio(this.newSel, this.newDesc, this.pid, data);
        });
      } else {
        this.storage.get('token').then((data: any) => {
          this.api.editarPublicacio(this.newSel, this.desc, this.pid, data);
        });
      }
  }

}
