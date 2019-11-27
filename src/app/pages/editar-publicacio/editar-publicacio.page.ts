import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import {AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


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

  constructor( private router: Router,
               public alertController: AlertController,
               private translate: TranslateService,
               public api: ApiService,
               private route: ActivatedRoute,
               private storage: Storage) {
   }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.pid = data.idp;
      this.path = data.video;
      this.desc = data.desc;
      this.newSel = data.game_en;
    });
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
    });
  }


  save() {
    let id;
    const a = this.newSel;
    for (const game of this.games) {
         if (game.name_en === a) {
          id = game.id;
         }
    }
    this.storage.get('token').then((data: any) => {
          this.api.editarPublicacio(id, this.desc, this.pid, data).subscribe((t: any) => {
          });
        });
    this.alertController.create({
        header: this.translate.instant('PAGE.EDITAR.MESSTITLE'),
        message: this.translate.instant('PAGE.EDITAR.MESSDESC'),
        buttons: this.translate.instant('PAGE.EDITAR.BUTTON')
      }).then(alert => {
        alert.present();
        alert.onDidDismiss().then(() => {
          this.router.navigate(['/tabs/mur']);
        });
      });
  }
}
