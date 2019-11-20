import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  data;
  pathFotoPerfil = '';
  Perfiluser = '';
  public;
  seguint;

  npubli = 0;
  nseguid = 0;
  nseguit = 0;

  user;
  token;
  publicacio;

  constructor(private route: ActivatedRoute, private api: ApiService, private store: Storage) { }

Follow() {
  if (!this.seguint) {
    this.api.Seguir(this.user, this.Perfiluser, this.token).subscribe((data: any) => {
      console.log(data);
    });
  } else {
    this.api.DeixardeSeguir(this.user, this.Perfiluser, this.token).subscribe((data: any) => {
      console.log(data);
    });
  }
  this.seguint = !this.seguint;
}

VeurePublicacions() {
  if (this.public) {
    return true;
  } else if (this.seguint) {
    return true;
  } else { return false; }
}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let com  = JSON.parse(params.special);
      this.data = com;
    });
    this.store.get('token').then((token) => {
      this.token = token;
      this.api.recuperarInfoUser(this.data, token).subscribe((data2: any) => {
        console.log(data2);
        if (data2.value[0].photo_path !== null) {
          this.pathFotoPerfil = 'http://www.sharefy.tk' + data2.value[0].photo_path;
        }
        if (data2.value[0].username !== null) {
          this.Perfiluser = data2.value[0].username;
        }
        if (data2.value[0].public !== null) {
          if (data2.value[0].public === 1) {
            this.public = false;
          } else {
            this.public = false;
          }
        }
        this.store.get('username').then((val) => {
          this.user = val;
          this.api.IsFollowing(val, this.Perfiluser, token).subscribe((data: any) => {
            if (data.value === 'true') {
              this.seguint = true;
            } else { this.seguint = false; }
          });
        });
        this.api.getAllPublis(data2.value[0].id, null).subscribe( (data: any) => {
          this.publicacio = data.value;
        });
      });
    });
  }
}
