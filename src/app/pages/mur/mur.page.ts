import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.page.html',
  styleUrls: ['./mur.page.scss'],
})
export class MurPage implements OnInit {

  publicacio: any;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAllPublis(8, null).subscribe( (data: any) => {
      this.publicacio = data.value;
    });
    this.api.getAllPublis(25, null).subscribe( (data: any) => {
      this.publicacio.push(...data.value);
    });
  }

}
