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
      console.log(data); // STATUS 200
    }, error => {
    });
    console.log(RecMail); // es mira si el mail es correcte o no
    let x: boolean;
    x = true;
    if (x) { // si es correcte
      this.alertController.create({
        header: 'Correu enviat',
        message: 'Contrasenya enviada a la dirrecció donada, sino la rebut repeteixi el procés i asseguris que el correu és el correcte',
        buttons: ['Dacord']
      }).then(alert => {
        alert.present();
      });
    } else { // si el correu introduit no es correcte
      this.alertController.create({
        header: 'Correu erroni',
        message: 'El correu introduït no existeix',
        buttons: ['Dacord']
      }).then(alert => {
        alert.present();
      });
    }
  }

}
