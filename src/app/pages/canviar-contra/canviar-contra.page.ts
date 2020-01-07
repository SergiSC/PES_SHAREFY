import { Component, OnInit } from '@angular/core';
import {errorsRegistre} from '../registre/registre.errors';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-canviar-contra',
  templateUrl: './canviar-contra.page.html',
  styleUrls: ['./canviar-contra.page.scss'],
})
export class CanviarContraPage implements OnInit {

  oldPass;
  missatgeErrorPassword = [];
  missatgeErrorPasswordRep = [];
  missatgeErrorOldPassword = [];
  regPasswordRepeat;
  regPassword;
  err = new errorsRegistre(this.translate);

  constructor(public translate: TranslateService, public toastController: ToastController, public api: ApiService, public storage: Storage) { }

  ngOnInit() {
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

  validInputs() {
    // tslint:disable-next-line:max-line-length
    if (this.oldPass === undefined || this.oldPass === '' || this.regPassword === undefined || this.regPassword === '' || this.regPasswordRepeat === undefined || this.regPasswordRepeat === '' || this.missatgeErrorPassword.length > 0 || this.missatgeErrorPasswordRep.length > 0) { return false; } else { return true; }
  }

  changePassword() {
      if (this.validInputs()) {
        this.storage.get('username').then((usr) => {
          this.storage.get('token').then((tk) => {
            console.log(usr, tk, this.oldPass, this.regPassword);
            this.api.changePass(usr, tk, this.regPassword, this.oldPass).subscribe((result) => {
              console.log(result);
            });
          });
        });
      } else {
        this.presentToastWithOptions();
      }
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
