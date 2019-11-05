import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {Storage} from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';

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

  constructor(private router: Router,
              public alertController: AlertController,
              public toastController: ToastController,
              private api: ApiService,
              private storage: Storage,
              private Transaltor: TranslateService,
              public afAuth: AngularFireAuth) {}

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
      buttons: this.Transaltor.instant('PAGE.RECUPERAR.BUTTON'),
    });
    (await alert).present();
  }

  goToLegal() {
    this.router.navigateByUrl('/legal');
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    let found = false;
    let email = signInSuccessData.authResult.additionalUserInfo.profile.email;
    let aa = this.emailList.forEach(element => {
      if(element.email === email) found = true
    })

    if (found) {
      this.alertController.create({
        header: this.Transaltor.instant('PAGE.LOGIN.TITLEALERT'),
        message: this.Transaltor.instant('PAGE.LOGIN.MESSAGEALERT'),
        buttons: ['Ok'] 
      }).then(alert => {
        alert.present();
      });

    }
    //if false, /api/user/token_pass
    //else, creo nuevo user y llamo token
    console.log(this.emailList)
    console.log(signInSuccessData)
  }
  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData)
  } 

  ngOnInit() {
    this.api.getAllEmails().subscribe((data: any) => {
      console.log(data)
      this.emailList = data.list;
    });
    this.storage.get('token').then( (data:any) => {
      if(data != null) {
        this.router.navigateByUrl('/tabs');
      }
    });
  }
}
