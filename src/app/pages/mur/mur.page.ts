import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.page.html',
  styleUrls: ['./mur.page.scss'],
})
export class MurPage implements OnInit {

  publicacio: any;
  constructor(private api: ApiService,
              private router: Router) {}

  ngOnInit() {
    this.api.getAllPublis(8, null).subscribe( (data: any) => {
      this.publicacio = data.value;
    });
    this.api.getAllPublis(25, null).subscribe( (data: any) => {
      this.publicacio.push(...data.value);
    });
    this.api.getAllPublis(54, null).subscribe( (data: any) => {
      this.publicacio.push(...data.value);
      console.log(this.publicacio);
    });
  }

  openSearch() {
    this.router.navigateByUrl('/buscar');
  }

}
