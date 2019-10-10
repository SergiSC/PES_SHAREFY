import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fcm: FCM,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const userLang = 'cat';
    this.translate.use(userLang);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
      this.router.navigate(['login']);
    });
  }
}
