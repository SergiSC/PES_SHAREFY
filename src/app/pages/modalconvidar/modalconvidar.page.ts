import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {TranslateService} from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalconvidar',
  templateUrl: './modalconvidar.page.html',
  styleUrls: ['./modalconvidar.page.scss'],
})
export class ModalconvidarPage implements OnInit {

  jocs;
  jocSeleccionat;
  @Input() usernameReciver: string;
  @Input() photoReciver: string;

  constructor(
    private api: ApiService,
    private translate: TranslateService,
    private storage: Storage,
    public modalController: ModalController) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      this.jocs = data.value;
    });
  }

  enviaNotificacio() {
    this.storage.get('token').then(tok => {
      this.storage.get('username').then(usr => {
        this.api.inviteGame(this.jocSeleccionat, this.usernameReciver, usr, tok)
      });
    });
    this.tancarModal();
  }

  tancarModal() {
    this.modalController.dismiss();
  }

  customPopoverOptions: any = {
    header: this.translate.instant('PAGE.MODALCONVIDAR.PLACEHOLDERSELECT'),
  };

}
