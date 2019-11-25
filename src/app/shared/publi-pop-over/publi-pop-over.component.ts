import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-publi-pop-over',
  templateUrl: './publi-pop-over.component.html',
  styleUrls: ['./publi-pop-over.component.scss'],
})
export class PubliPopOverComponent implements OnInit {

  idPublication: any;
  game: any;
  desc: any;
  video: any;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private translate: TranslateService,
    private popoverController: PopoverController,
    private api: ApiService,
    private storage: Storage,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  redirectToEdit() {
    this.DismissClick();
    const edit = {video: this.video, desc: this.desc, game: this.game, idp: this.idPublication };
    this.router.navigate(['/editar-publicacio/' + this.idPublication, edit]);
  }

  showAlertDelete() {
    this.DismissClick()
    this.alertController.create({
      header: this.translate.instant('SHARED.POPOVER.TITLEALERTBORRAR'),
      message: this.translate.instant('SHARED.POPOVER.TEXTALERTBORRAR'),
      buttons: [
        {
          text: this.translate.instant('SHARED.POPOVER.BUTTONCANCEL'),
          cssClass: 'secondary',
          handler: () => {
            console.log('click cnacel');
          }
        }, {
          text: this.translate.instant('SHARED.POPOVER.BUTTONESBORRAR'),
          handler: () => {
            //TODO falta fer refresh de la pagina al borrar
            this.storage.get('token').then((token) => {
              this.api.deletePublication(this.idPublication, token).subscribe((data: any) => {
                this.showToast(this.translate.instant('SHARED.POPOVER.TEXTDELETEOK'));
                location.reload()
              });
            });
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      duration: 3000,
    });
    await toast.present();
   }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

}