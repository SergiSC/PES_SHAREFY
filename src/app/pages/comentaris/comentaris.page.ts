import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-comentaris',
  templateUrl: './comentaris.page.html',
  styleUrls: ['./comentaris.page.scss'],
})
export class ComentarisPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private stor: Storage) { }
  comentaris;
  des;
  ownername;
  ownerphoto;
  Inpu: "";
  Idpublicacio: null;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let com  = JSON.parse(params.special);
      this.comentaris = com.coments;
      this.des = com.descrpicio;
      this.ownername = com.ownername;
      this.ownerphoto = com.ownerphoto;
      this.Idpublicacio = com.idpubli;
    });
  }

  AfegirCom() {
    this.stor.get('username').then((val) => {
      this.stor.get('token').then((token) => {      
        this.api.AddComment(val, this.Idpublicacio, token, this.Inpu).subscribe((data2: any) => {
          console.log(data2);
        });
      });
    });
  }
}
