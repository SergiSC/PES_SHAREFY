import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {Storage} from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import { errorsRegistre } from '../registre/registre.errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toast: any;
  mail: any;
  password: any;
  emailList: [];
  err = new errorsRegistre(this.Transaltor);

  constructor(private router: Router,
              public alertController: AlertController,
              public toastController: ToastController,
              private api: ApiService,
              private storage: Storage,
              private Transaltor: TranslateService,
              private googlePlus: GooglePlus) {}

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

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      duration: 3000,
    });
    await toast.present();
  }

  ngOnInit() {
    this.api.getAllEmails().subscribe((data: any) => {
      console.log(data);
      this.emailList = data.list;
    });
    this.storage.get('token').then( (data: any) => {
      if(data != null) {
        this.router.navigateByUrl('/tabs');
      }
    });
  }

  google_login() {
    this.googlePlus.login({})
        .then(res => {
          console.log(res);
          const user = {
            username: res.displayName,
            first_name: res.givenName,
            last_name: res.familyName,
            email: res.email,
          };
          this.api.postAfegirNouUsuariRegistrat(user).subscribe((data: any) => {
            this.storage.set('token', data.access_token);
            this.storage.set('username', res.displayName);
            this.showToast(this.err.alerts[0].msg);
            this.router.navigate(['/tabs']);
          }, err => {
            this.showToast(this.err.alerts[2].msg);
          });
        })
        .catch(err => console.error(err));
  }
  
}
