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
  private routeSub: Subscription;

  constructor(public api: ApiService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.api.getPublicationById(params['idPublicacio']).subscribe((data:any) => {
        this.publicacio = data.value
      })
    });
    this.api.getAllGames().subscribe((data:any) => {
      this.games = data.value
    });
  }

}
