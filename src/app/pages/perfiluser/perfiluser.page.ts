import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalconvidarPage } from '../modalconvidar/modalconvidar.page';

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
              private loadingController: LoadingController,  private router: Router,
              public modalController: ModalController) { }

  
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalconvidarPage,
      componentProps: {
        usernameReciver: this.Perfiluser,
        photoReciver: this.pathFotoPerfil
      }
    });
    await modal.present();
  }

Follow() {
  if (!this.seguint) {
    this.api.Seguir(this.user, this.Perfiluser, this.token).subscribe((data: any) => {
      this.nseguid++;
    });
  } else {
    this.api.DeixardeSeguir(this.user, this.Perfiluser, this.token).subscribe((data: any) => {
      this.nseguid--;
    });
  }
  this.seguint = !this.seguint;
}

go_to_follow(x) {
  if (x === 0) {
    const edit = {
      nom: this.iduser,
      type: 'Followers'
    };
    this.router.navigate(['/followers', edit]);
  } else {
    const edit = {
      nom: this.iduser,
      type: 'Following'
    };
    this.router.navigate(['/followers', edit]);
  }
}

ngOnInit() {
 
}
fullAvatar() {
  const edit = {pathFotoPerfil: this.pathFotoPerfil, nomUser: this.Perfiluser};
  this.router.navigate(['/avatarcomplet', edit]);
}

  ionViewWillEnter() {
    this.route.params.subscribe(data => {
      this.Perfiluser = data.nom;
      if (this.Perfiluser === undefined) {
        this.store.get('username').then(n => {
          this.Perfiluser = n;
          this.getInfo();
        });
      } else {
        this.getInfo();
      }
    });
  }

  getInfo() {
    this.GoToLogIn();
    this.presentLoading();
    this.store.get('token').then((token) => {
      this.token = token;
      this.api.recuperarInfoUser(this.Perfiluser, token).subscribe((data2: any) => {
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
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  GoToLogIn() {
    this.store.get('username').then((user) => {
      this.store.get('token').then((token) => {
        this.api.recuperarInfoUser(user, token).subscribe((data: any) => {
        }, err => {
          this.router.navigate(['/login']);
        });
      });
    });
  }
}
