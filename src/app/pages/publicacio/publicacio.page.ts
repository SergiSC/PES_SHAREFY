import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-publicacio',
  templateUrl: './publicacio.page.html',
  styleUrls: ['./publicacio.page.scss'],
})
export class PublicacioPage implements OnInit {

  idPublicacio: any
  dadesPublicacio: Object

  carregat = false

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private storage: Storage) { }

  

  gotoporfile() {}

  onClick() {
    console.log(this.dadesPublicacio)
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.api.getPublicationById(data.idp).subscribe((data2:any) => {
        this.dadesPublicacio = data2.value
        this.carregat = true;
      })
    });
  }
}
