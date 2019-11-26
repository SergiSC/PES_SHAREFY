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
    this.route.queryParams.subscribe(params => {
      let com  = JSON.parse(params.special);
      this.des = com.descrpicio;
      this.ownername = com.ownername;
      this.ownerphoto = com.ownerphoto;
      this.Idpublicacio = com.idpubli;
      this.getComents();
    });
    this.stor.get('username').then((val) => {
      this.user = val;
    });
  }

  getComents() {
    let c = [];
    this.api.getPublicationById(this.Idpublicacio).subscribe((data: any) => {
      data.value.comments.forEach(comment => {
        const coments = [ {
          name: comment.user.username,
          img: comment.user.photo_path,
          text: comment.text,
          id: comment.id
        }];
        c.push(...coments);
      });
      this.comentaris = c;
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
