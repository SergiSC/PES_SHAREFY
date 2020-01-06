import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-pubilike',
  templateUrl: './pubilike.page.html',
  styleUrls: ['./pubilike.page.scss'],
})
export class PubilikePage implements OnInit {

  publicacions;
  pub = undefined;
  constructor(private route: ActivatedRoute, private api: ApiService, private store: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let id;
    this.route.params.subscribe(data => {
      id = data.id;
      this.store.get('token').then(n => {
        this.api.getPulbisILike(id, n).subscribe((pub: any) => {
          this.publicacions = pub.value;
          if (this.publicacions.length === 0) {
            this.pub = true;
        } else { this.pub = false; }
        });
      });
    });
  }

}
