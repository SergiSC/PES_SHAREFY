import { Component, OnInit } from '@angular/core';
import {AlertController } from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  recMail: any;

  constructor(public alertController: AlertController,
              public api: ApiService,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  enviarMail() {
    this.api.resetPassword(this.recMail).subscribe( (data: any) => {
      this.alertController.create({
        header: this.translate.instant('PAGE.RECUPERAR.TITLE1'),
        message: this.translate.instant('PAGE.RECUPERAR.MESSAGE1'),
        buttons: this.translate.instant('PAGE.RECUPERAR.BUTTON')
      }).then(alert => {
        alert.present();
      });
    }, err => {
      this.alertController.create({
        header: this.translate.instant('PAGE.RECUPERAR.TITLE2'),
        message: this.translate.instant('PAGE.RECUPERAR.MESSAGE2'),
        buttons: this.translate.instant('PAGE.RECUPERAR.BUTTON')
      }).then(alert => {
        alert.present();
      });
    });
  }

  getCoordinates(ev) {
    console.log('x: ' + ev.clientX + ' y: ' + ev.clientY);
  }

}
