import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  notification: boolean;
  privacity: boolean;
  catS: boolean;
  enS: boolean;
  esS: boolean;
  constructor(public alertController: AlertController,
              private translate: TranslateService,
              private router: Router,
              private storage: Storage) {
  }

  ngOnInit() {
    if (this.translate.currentLang === 'cat') {
      this.catS = true;
    } else if (this.translate.currentLang === 'en') {
      this.enS = true;
    } else  {
      this.esS = true;
    }
  }

  privacitatOn() {

  }

  notificacionsOff() {

  }

  englishOn() {
    this.translate.use('en');
    this.storage.remove('lang');
    this.storage.set('lang', 'en');
  }

  spanishOn() {
    this.translate.use('es');
    this.storage.remove('lang');
    this.storage.set('lang', 'es');
  }

  catalanOn() {
    this.translate.use('cat');
    this.storage.remove('lang');
    this.storage.set('lang', 'cat');
  }

  close() {
    this.storage.remove('token');
    this.router.navigate(['login']);
  }
}
