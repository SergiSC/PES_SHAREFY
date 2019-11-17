import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { MurPage } from './pages/mur/mur.page';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fcm: FCM,
    private translate: TranslateService,
    private storage: Storage,
    private deeplink: Deeplinks
  )
  {
    this.initializeApp();
  }

  initializeApp() {
    this.storage.get('lang').then((data: any) => {
      if (data !== null) {
        this.translate.use(data);
      } else {
        this.storage.set('lang', 'cat');
        this.translate.use('cat');
      }
  });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.deeplink.route({
        '/mur/: MurPage': MurPage
      }).subscribe(match => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, nomatch => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
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
