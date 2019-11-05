import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-publicacio',
  templateUrl: './edit-publicacio.page.html',
  styleUrls: ['./edit-publicacio.page.scss'],
})
export class EditPublicacioPage implements OnInit {

  games: any;

  constructor(public api: ApiService) {
   }

  ngOnInit() {
    this.games = this.api.getAllGames();
  }

}
