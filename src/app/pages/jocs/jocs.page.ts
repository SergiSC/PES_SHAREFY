import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-jocs',
  templateUrl: './jocs.page.html',
  styleUrls: ['./jocs.page.scss'],
})
export class JocsPage implements OnInit {

  games: any;
  descTrad: any;

  constructor(public api: ApiService, private router: Router, private translate: TranslateService) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
    });
  }

  navigate(id: any) {
    let joc;
    for (const game of this.games) {
      if (game.id  === id) {
        this.api.getGameDescription(game.id, this.translate.currentLang).subscribe((data: any) => {
          this.descTrad = data.value;
        });
        joc = {imag: game.image_url, desc: this.descTrad, name: game.name, idg: game.id};
      }
    }
    this.router.navigate(['/perfiljoc/', joc]);
  }

}
