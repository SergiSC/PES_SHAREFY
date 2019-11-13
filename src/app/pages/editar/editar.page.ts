import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})

export class EditarPage implements OnInit {

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
