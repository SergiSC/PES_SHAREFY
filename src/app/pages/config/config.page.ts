import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})

export class ConfigPage implements OnInit {
  notification: boolean;
  private: boolean;
  catS: boolean;
  enS: boolean;
  esS: boolean;
  user = {};
  constructor(
    public api: ApiService,
    public alertController: AlertController,
    private translate: TranslateService,
    private router: Router,
    private storage: Storage,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
   }

  ionViewDidEnter() {
    this.storage.get('token').then((token: any) => {
      this.storage.get('username').then((username: any) => {
        this.api.recuperarInfoUser(username, token).subscribe((data: any) => {
           console.log(data);
           if (data.value[0].notification == 1) {
            this.notification = true;
          } else {
            this.notification = false;
          }
           if (data.value[0].public != 1) {
            this.private = true;
          } else {
            this.private = false;
          }
        });
      });
    });
    if (this.translate.currentLang === 'cat') {
      this.catS = true;
    } else if (this.translate.currentLang === 'en') {
      this.enS = true;
    } else  {
      this.esS = true;
    }
  }

  sendInfo(lang) {
    let noti: string = String(this.notification);
    let priv: string = String(this.private);
    if(lang !== 'cat' && lang !== 'en' && lang !== 'es') {
      this.storage.get('token').then((token: any) => {
        this.storage.get('username').then((username: any) => {
          this.api.setUserConfig(username, token, noti, priv, this.translate.currentLang).subscribe((data: any) => {
            console.log(data);
          });
        });
      });
    } else {
      this.storage.get('token').then((token: any) => {
        this.storage.get('username').then((username: any) => {
          this.api.setUserConfig(username, token, noti, priv, lang).subscribe((data: any) => {
            console.log(data);
          });
        });
      });
    }
  }

  changeL(lang) {
    this.translate.use(lang);
    this.storage.set('lang', lang);
    this.sendInfo(lang);
  }

  close() {
    this.storage.remove('token');
    this.storage.remove('username');
    this.router.navigate(['login']);
  }
}
