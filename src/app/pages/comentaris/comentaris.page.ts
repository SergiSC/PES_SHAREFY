import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-comentaris',
  templateUrl: './comentaris.page.html',
  styleUrls: ['./comentaris.page.scss'],
})
export class ComentarisPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private stor: Storage) { }
  des;
  ownername;
  ownerphoto;
  Inpu = '';
  Idpublicacio: null;
  comentaris = [];
  user: '';

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.Idpublicacio = data.id;
      this.des = data.des;
      this.ownername = data.name;
      this.ownerphoto = data.photo;
      this.getComents();
    });

    this.stor.get('username').then((val) => {
      this.user = val;
    });
  }

  getComents() {
    this.stor.get('token').then((token) => {
      this.api.getCommentsPubliId(this.Idpublicacio, token).subscribe((data: any) => {
        console.log(data);
        this.comentaris = data.comments;
      });
    });
  }

  AfegirCom() {
    this.stor.get('token').then((token) => {
      this.api.AddComment(this.user, this.Idpublicacio, token, this.Inpu).subscribe((data2: any) => {
        this.Inpu = "";
        this.getComents();
      });
    });
  }

  BorrarCom(id) {
    this.stor.get('token').then((token) => {
      this.api.DeleteComment(id, token).subscribe((data2: any) => {
        this.getComents();
      });
    });
  }
  goperfiluser(name) {
    const edit = {
      nom: name
    };
    this.router.navigate(['/perfiluser', edit]);
  }
}
