import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationExtras } from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.page.html',
  styleUrls: ['./mur.page.scss'],
})
export class MurPage implements OnInit {

  publicacio: any;
  constructor(private api: ApiService,
              private router: Router,
              private store: Storage) {}

  ngOnInit() {
    this.api.getAllPublis(8, null).subscribe( (data: any) => {
      this.publicacio = data.value;
    });
    this.api.getAllPublis(25, null).subscribe( (data: any) => {
      this.publicacio.push(...data.value);
    });
    this.api.getAllPublis(54, null).subscribe( (data: any) => {
      this.publicacio.push(...data.value);
    });
  }

  gotoperfiluser() {
    this.store.get('username').then((val) => {
      const edit = {
        nom: val
      };
      this.router.navigate(['/perfiluser', edit]);
    });
  }

  openSearch() {
    this.router.navigateByUrl('/buscar');
  }
}
