import { Component, OnInit } from '@angular/core';
import {AlertController } from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {error} from 'util';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(public alertController: AlertController, public api: ApiService) { }

  ngOnInit() {
  }

  enviarMail() {
    const RecMail = (document.getElementById('mail') as HTMLInputElement).value;
    this.api.resetPassword(RecMail).subscribe( (data: any) => {
      this.alertController.create({
        header: 'Correu enviat',
        message: 'Contrasenya enviada a la dirrecció donada, sino la rebut repeteixi el procés i asseguris que el correu és el correcte',
        buttons: ['Dacord']
      }).then(alert => {
        alert.present();
      });
    }, err => {
      this.alertController.create({
        header: 'Correu erroni',
        message: 'El correu introduït no existeix',
        buttons: ['Dacord']
      }).then(alert => {
        alert.present();
      });
    });
  }

}
