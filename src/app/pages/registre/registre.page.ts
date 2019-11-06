import { Component, OnInit } from '@angular/core';
import { errorsRegistre } from './registre.errors';
import { ApiService } from 'src/app/services/api.service';
import {TranslateService} from '@ngx-translate/core';
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
  legalChecked: any;
  missatgeErrorNick = [];
  missatgeErrorMail = [];
  missatgeErrorPassword = [];
  missatgeErrorPasswordRep = [];
  err = new errorsRegistre(this.translate);

  constructor(
    public api: ApiService,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.api.getAllUsers().subscribe((data: any) => {
      this.listUsers = data.list;
    });
  }

  registerUser() {
    if (!this.validInputs()) {
      this.showToast(this.err.alerts[1].msg);
    } else {
      const user = {
        username: this.regNick,
        first_name: this.regName,
        last_name: this.regLastname,
        email: this.regEmail,
        password: this.regPassword,
        birth_date: this.regDate
      };
      this.api.postAfegirNouUsuariRegistrat(user).subscribe((data: any) => {
        this.storage.set('token', data.access_token);
        this.storage.set('username', this.regNick);
        this.showToast(this.err.alerts[0].msg);
        this.router.navigate(['/tabs']);
      }, err => {
        this.showToast(this.err.alerts[2].msg);
      });
    }
  }

  validInputs() {
    if (this.regNick === undefined || this.regNick === ""
      || this.regName === undefined || this.regName === ""
      || this.regLastname === undefined || this.regLastname === "" 
      || this.regEmail === undefined || this.regEmail === ""
      || this.regDate === undefined || this.regDate === ""
      || this.regPassword === undefined || this.regPassword === "" 
      || this.regPasswordRepeat === undefined || this.regPasswordRepeat === "" 
      || this.missatgeErrorNick.length > 0 || this.missatgeErrorMail.length > 0 || this.missatgeErrorPassword.length > 0 || this.missatgeErrorPasswordRep.length > 0
      || this.legalChecked === false) return false
    else return true
  }

  checkNickName() {
    this.missatgeErrorNick = [];
    const labelNick = document.getElementById('item-input-nick');
    if (this.regNick.length < 3 || this.regNick.length > 20) {
      this.missatgeErrorNick.push(this.err.errors[0].msg);
    } else {
      this.listUsers.forEach(element => {
        if (element.username.toLowerCase() === this.regNick.toLowerCase()) {
          this.missatgeErrorNick.push(this.err.errors[1].msg);
        }
      });
      const re = /^([a-zA-Z0-9 _-]+)$/;
      if (!re.test(String(this.regNick).toLowerCase())) {
        this.missatgeErrorNick.push(this.err.errors[2].msg);
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
      this.missatgeErrorMail.push(this.err.errors[3].msg);
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
    if (this.regPassword.length < 8) { this.missatgeErrorPassword.push(this.err.errors[4].msg); }
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (this.regPassword.match(re) === null) {
      this.missatgeErrorPassword.push(this.err.errors[5].msg);
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
    if (this.regPasswordRepeat !== this.regPassword) { this.missatgeErrorPasswordRep.push(this.err.errors[6].msg); }

    if (this.missatgeErrorPasswordRep.length === 0) {
      labelPasswordRep.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelPasswordRep.setAttribute('style', '--highlight-background: red !important;');
    }
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
}
