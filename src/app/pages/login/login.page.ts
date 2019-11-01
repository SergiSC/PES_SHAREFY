import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {Storage} from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toast: any;
  mail: any;
  password: any;

  constructor(private router: Router,
              public alertController: AlertController,
              public toastController: ToastController,
              private api: ApiService,
              private storage: Storage,
              private Transaltor: TranslateService) {}

  entrar() {
    if (this.password !== null && this.mail !== null) {
      this.api.login(this.mail, this.password).subscribe((data: any) => {
        console.log(data);
        this.storage.set('token', data.access_token);
        this.storage.set('username', data.username);
        this.router.navigateByUrl('/tabs');
      }, err => {
        this.presentAlert();
        this.password = null;
      });
    }
  }

  async presentAlert() {
    const alert = this.alertController.create({
      header: this.Transaltor.instant('PAGE.LOGIN.HEADERALERTA'),
      subHeader: this.Transaltor.instant('PAGE.LOGIN.TEXTALERTA'),
      buttons: [this.Transaltor.instant('PAGE.LOGIN.BUTTON')]
    });
    (await alert).present();
  }

  goToLegal() {
    this.router.navigateByUrl('/legal');
  }

  ngOnInit() {
    this.storage.get('token').then( (data: any) => {
      if(data != null) {
        this.router.navigateByUrl('/tabs');
      }
    });
  }
}
