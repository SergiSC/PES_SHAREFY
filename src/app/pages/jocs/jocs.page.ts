import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-jocs',
  templateUrl: './jocs.page.html',
  styleUrls: ['./jocs.page.scss'],
})
export class JocsPage implements OnInit {

  games: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
      console.log(data.value);
    });
  }

}
