import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-publi-pop-over',
  templateUrl: './publi-pop-over.component.html',
  styleUrls: ['./publi-pop-over.component.scss'],
})
export class PubliPopOverComponent implements OnInit {

  idPublication

  constructor(
    private router: Router,
    public alertController: AlertController,
    private translate: TranslateService,
    private popoverController: PopoverController) { }

  ngOnInit() {
  }

  redirectToEdit() {
    this.DismissClick()
    console.log(this.idPublication)
    this.router.navigateByUrl('/edit-publicacio/'+ this.idPublication);
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
            //TODO esborrar publicacio
            console.log('click esborrar');
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

}
