import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';



@Component({
  selector: 'app-jocs',
  templateUrl: './jocs.page.html',
  styleUrls: ['./jocs.page.scss'],
})
export class JocsPage implements OnInit {

  games: any;
  descTrad: string;

  constructor(public api: ApiService, private router: Router, private translate: TranslateService, private store: Storage) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
    });
  }

  navigate(id: any) {
    this.api.getGameDescription(id, this.translate.currentLang).subscribe((data: any) => {
      const joc = {
        imag: data.value.image_url,
        desc: data.value.description,
        name: data.value.name,
        idg: data.value.id
      };
      this.router.navigate(['/perfiljoc', joc]);
    });
  }

  openSearch() {
    this.router.navigateByUrl('/buscar');
  }

  gotoperfiluser() {
    this.store.get('username').then((val) => {
      const edit = {
        nom: val
      };
      this.router.navigate(['/perfiluser', edit]);
    });
  }
}
