import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import {AlertController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(public alertController: AlertController) {}

  ngOnInit() { // mirem la variable de la privacitat i de l'idioma per a poder iniciar el toogle i l'idioma de la pagina
  }

  privacitatOn() { // s'activa quan es fa la compte privada
    if (0 ) { // mirem l'esta del toggle i cambiem la variable de l'idioma
    }
  }

  englishOn() {
    /* let platform: Platform;
    let statusBar: StatusBar;
    let fcm: FCM;
    let translate: TranslateService;
    let userLang = 'eng';
    translate.use(userLang);
    platform.ready().then(() => {
      statusBar.styleDefault();
      fcm.getToken().then(token => {
        console.log(token);
      });
    });*/
  }

  spanishOn() {

  }

  catalanOn() {

  }

  notificacionsOff() { // per defecte estan activades i al apretar es desactien
    
  }

}
