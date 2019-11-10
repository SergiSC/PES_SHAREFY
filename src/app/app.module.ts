import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PubliPopOverComponent } from '../app/publi-pop-over/publi-pop-over.component';
import {GooglePlus} from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent, PubliPopOverComponent],
  entryComponents: [PubliPopOverComponent],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: customTranslateLoader,
          deps: [HttpClient]
        }
    }),
  ],
  providers: [
      StatusBar, SplashScreen, FCM, Camera, File, GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StreamingMedia
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

