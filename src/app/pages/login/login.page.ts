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
        this.storage.set('token', data.access_token);
        this.storage.set('username', data.username);
        this.storage.get('noti').then(n => {
          if(n == undefined) {
            n = 1234;
          }
          this.api.setNoti(data.username, data.access_token, n).subscribe(date => {
            this.router.navigateByUrl('/tabs');
          });
        });
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
      this.emailList = data.list;
    });
    this.storage.get('token').then( (data: any) => {
      if (data != null) {
        this.router.navigateByUrl('/tabs');
      }
    });
  }

  google_login() {
    this.googlePlus.login(
                  {
                    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                    'webClientId': '86262135528-mh2ujp0to4rnrvk0capvuoenv3tjidn5.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                    'offline': true
                  }
        ).then(res => {
          alert(JSON.stringify(res));
          //console.log(JSON.stringify(res));
          //console.log(res.displayName);
          const user = {
            username: res.displayName.replace(' ', ''),
            first_name: res.givenName,
            last_name: res.familyName,
            email: res.email,
            idToken: res.idToken
          };
          this.api.googleLogin(user).subscribe((r: any) => {
            alert(JSON.stringify(r));
            this.storage.set('token', r.access_token);
            this.storage.set('username', r.username);
            //this.api.postSetTokenFromGoogleAuth(res.displayName.replace(' ', ''), res.userId).subscribe(resp => {
            this.storage.get('noti').then(n => {
              if(n == undefined) {
                n = 1234;
              }
              this.api.setNoti(r.username, r.access_token, n).subscribe(d => {
                this.router.navigate(['/tabs']);
              });
            });
            //});
          }, error => {
            alert("error");
            alert(JSON.stringify(error));
            console.log(JSON.stringify(error));
            /*
            this.api.postAfegirNouUsuariRegistrat(user).subscribe((data: any) => {
              this.storage.set('token', res.userId);
              this.storage.set('username', res.displayName.replace(' ', ''));
              this.showToast(this.err.alerts[0].msg);
              this.api.postSetTokenFromGoogleAuth(res.displayName.replace(' ', ''), res.userId).subscribe(resp => {
                this.storage.get('noti').then(n => {
                  // this.api.setNoti(data.username, res.accessToken, n).subscribe(d => {
                    this.router.navigate(['/tabs']);
                  // });
                });
              });
            }, err => {
              this.showToast(this.err.alerts[2].msg);
            });
            */
          });
        })
        .catch(err => console.error(err));
  }
}
