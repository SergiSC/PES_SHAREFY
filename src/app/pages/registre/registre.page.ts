import { Component, OnInit } from '@angular/core';
import { errorsRegistre } from './registre.errors';
import { ApiService } from 'src/app/services/api.service';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {

  regNick: any;
  regName: any;
  regLastname: any;
  regEmail: any;
  regDate: any;
  regPassword: any;
  regPasswordRepeat: any;
  listUsers: any;
  missatgeErrorNick = [];
  missatgeErrorMail = [];
  missatgeErrorPassword = [];
  missatgeErrorPasswordRep = [];
  errorRegistre: errorsRegistre;

  constructor(public api: ApiService, private toastController: ToastController, private router: Router, private storage: Storage) {}

  ngOnInit() {
    this.api.getAllUsers().subscribe((data: any) => {
      this.listUsers = data.list;
    });
  }

  registerUser() {
    if (this.regNick === null || this.regName === null || this.regLastname === null || this.regEmail === null
        || this.regDate === null || this.regPassword === null || this.regPasswordRepeat === null || this.missatgeErrorNick.length > 0
        || this.missatgeErrorMail.length > 0 || this.missatgeErrorPassword.length > 0 || this.missatgeErrorPasswordRep.length > 0) {
      this.showToast('Hi ha camps que no són correctes o no estan complets');
    } else {
      const user = {
        username: this.regNick,
        first_name: this.regName,
        last_name: this.regLastname,
        email: this.regEmail,
        password: this.regPassword
      };
      this.api.postAfegirNouUsuariRegistrat(user).subscribe((data: any) => {
        this.storage.set('token', data.access_token);
        this.showToast('El registre s\'ha completat satifactoriament');
        this.router.navigate(['/tabs']);
      }, err => {
        this.showToast('Hi ha hagut algun problema alhora de crear el nou perfil');
      });
    }
  }

  checkNickName() {
    this.missatgeErrorNick = [];
    const labelNick = document.getElementById('item-input-nick');
    if (this.regNick.length < 3 || this.regNick.length > 20) {
      this.missatgeErrorNick.push(this.errorRegistre.errors[0].msg);
    } else {
      this.listUsers.forEach(element => {
        if (element.username.toLowerCase() === this.regNick.toLowerCase()) {
          this.missatgeErrorNick.push(this.errorRegistre.errors[1].msg);
        }
      });
      const re = /^([a-zA-Z0-9 _-]+)$/;
      if (!re.test(String(this.regNick).toLowerCase())) {
        this.missatgeErrorNick.push(this.errorRegistre.errors[2].msg);
      }
    }
    if (this.missatgeErrorNick.length === 0) {
      labelNick.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelNick.setAttribute('style', '--highlight-background: red !important;');
    }
  }

  checkEmailFormat() {
    const labelMail = document.getElementById('item-input-mail');
    this.missatgeErrorMail = [];
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(this.regEmail).toLowerCase())) {
      this.missatgeErrorMail.push(this.errorRegistre.errors[3].msg);
    }
    if (this.missatgeErrorMail.length === 0) {
      labelMail.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelMail.setAttribute('style', '--highlight-background: red !important;');
    }
  }

  checkPasswordFormat() {
    const labelPassword = document.getElementById('item-input-password');
    this.missatgeErrorPassword = [];
    if (this.regPassword.length < 8) { this.missatgeErrorPassword.push(this.errorRegistre.errors[4].msg); }
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (this.regPassword.match(re) === null) {
      this.missatgeErrorPassword.push(this.errorRegistre.errors[5].msg);
    }
    if (this.missatgeErrorPassword.length === 0) {
      labelPassword.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelPassword.setAttribute('style', '--highlight-background: red !important;');
    }
  }

  checkSamePasswords() {
    const labelPasswordRep = document.getElementById('item-input-password-rep');
    this.missatgeErrorPasswordRep = [];
    if (this.regPasswordRepeat !== this.regPassword) { this.missatgeErrorPasswordRep.push(this.errorRegistre.errors[6].msg); }

    if (this.missatgeErrorPasswordRep.length === 0) {
      labelPasswordRep.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelPasswordRep.setAttribute('style', '--highlight-background: red !important;');
    }
  }

  async showToast(msg) {
   const toast = await this.toastController.create({
     message: msg,
     showCloseButton: true,
     position: 'bottom',
     closeButtonText: 'Close',
     duration: 2000,
   });
   await toast.present();
  }
}
