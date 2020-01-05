import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import { ApiService } from '../../services/api.service'


@Component({
  selector: 'app-vistapublicacio',
  templateUrl: './vistapublicacio.page.html',
  styleUrls: ['./vistapublicacio.page.scss'],
})
export class VistapublicacioPage implements OnInit {

  idPublicacio: any
  dadesPublicacio: any
  comentaris = []

  carregat = false
  nouComentari = ''

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private storage: Storage) { }

  
  goToComentaris() {
    let comentariParams = {
      idpubli: this.idPublicacio,
      ownername: this.dadesPublicacio.user.username,
      ownerphoto: this.dadesPublicacio.user.photo_path,
      descrpicio: this.dadesPublicacio.text,
      coments: [],
    };
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(comentariParams)
      }
    };
    this.router.navigate(['/comentaris'], navigationExtras);
   }

   afegirComentari() {
    this.storage.get('token').then((token) => {
      this.storage.get('username').then((user) => {
        this.api.AddComment(user, this.idPublicacio, token, this.nouComentari).subscribe((data2: any) => {
          this.nouComentari = '';
          this.api.sendNotification(user, this.dadesPublicacio.user.username, token,'comment'). subscribe();
          //falta aplicar ion-refresher per refrescar els comentaris
        });
      });
    });
   }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.api.getPublicationById(data.idp).subscribe((data2:any) => {
        this.idPublicacio = data.idp
        this.dadesPublicacio = data2.value
        this.comentaris = data2.value.comments
        this.comentaris.sort((a,b) => (a.date > b.date) ? 1 : ((b.date < a.date) ? -1 : 0)); 
        this.carregat = true;
      })
    });
  }
}
