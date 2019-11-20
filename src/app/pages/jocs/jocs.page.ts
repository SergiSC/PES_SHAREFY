import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-jocs',
  templateUrl: './jocs.page.html',
  styleUrls: ['./jocs.page.scss'],
})
export class JocsPage implements OnInit {

  games: any;

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
    });
  }

  navigate(id: any) {
    let joc;
    for (const game of this.games) {
      if (game.id  === id) {
        joc = {imag: game.image_url, desc: game.description, name: game.name, idg: game.id};
      }
    }
    this.router.navigate(['/perfiljoc/', joc]);
  }

}
