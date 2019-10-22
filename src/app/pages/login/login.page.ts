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
        this.storage.set('token', data.access_token);
        this.router.navigateByUrl('/tabs');
      }, err => {
        this.presentAlert();
        this.password = null;
      });
    }
  }

  async presentAlert() {
    const alert = this.alertController.create({
      header: this.Transaltor.instant('PAGE.LOGIN:HEADERALERTA'),
      subHeader: this.Transaltor.instant('PAGE.LOGIN:TEXTALERTA'),
      buttons: ['Okei']
    });
    (await alert).present();
  }

  async showToast() {
    this.toast = this.toastController.create({
      message: 'Login successfully',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      duration: 1000,
    });
    await this.toast.present();
  }

  ngOnInit() {
    this.storage.get('token').then( () => {
          this.router.navigateByUrl('/tabs');
    });
  }
}
