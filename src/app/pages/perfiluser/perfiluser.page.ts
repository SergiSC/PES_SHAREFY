import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  pathFotoPerfil = '';
  Perfiluser = undefined;
  public = undefined;
  seguint = undefined;
  iduser;

  npubli = 0;
  nseguid = 0;
  nseguit = 0;
  user = undefined;
  token;
  publicacio;
  esell = true;
  noPubli = true;
  isLoading = false;


  constructor(private route: ActivatedRoute, private api: ApiService, private store: Storage,
              private loadingController: LoadingController,  private router: Router) { }


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

go_to_follow(x) {
  let CC;
  if (x === 0) {
    CC = [this.iduser, 'Followers'];
  } else {
    CC = [this.iduser, 'Following'];
  }
  const navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify(CC)
    }
  };
  if (this.public === true || this.seguint === true) {this.router.navigate(['/followers'], navigationExtras); }
}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const com  = JSON.parse(params.special);
    this.Perfiluser = com;
  });
}

  ionViewWillEnter() {
    this.presentLoading();
    this.route.queryParams.subscribe(params => {
      const com  = JSON.parse(params.special);
      this.Perfiluser = com;
    });
    this.store.get('token').then((token) => {
      this.token = token;
      this.api.recuperarInfoUser(this.Perfiluser, token).subscribe((data2: any) => {
        console.log(data2);
        if (data2.value[0].photo_path !== null) {
          this.pathFotoPerfil = 'http://www.sharefy.tk' + data2.value[0].photo_path;
        }
        this.iduser = data2.value[0].id;
        if (data2.value[0].public !== null) {
          if (data2.value[0].public === 1) {
            this.public = true;
          } else {
            this.public = false;
          }
        }
        this.nseguid = data2.value[0].followers_count;
        this.nseguit = data2.value[0].followed_count;
        this.npubli = data2.value[0].publications_count;
        this.store.get('username').then((val) => {
          this.user = val;
          if (!(val === this.Perfiluser)) {
            this.api.IsFollowing(val, this.Perfiluser, token).subscribe((data: any) => {
              if (data.value === 'true') {
                this.seguint = true;
              } else { this.seguint = false; }
              this.esell = false;
            });
          } else {
            this.esell = true;
          }
        });
        this.api.getAllPublis(data2.value[0].id, null).subscribe( (data: any) => {
          if (data.value.length !== 0) {
            this.publicacio = data.value;
            this.noPubli = false;
          }
          this.dismiss();

        });
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async presentLoading() {
    return await this.loadingController.create({
      duration: 5000,
      message: "Wait"
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
}
