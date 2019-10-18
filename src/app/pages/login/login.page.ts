import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  toast: any;

  constructor(private router: Router,
              public alertController: AlertController,
              public toastController: ToastController,
              private api: ApiService) {}

  entrar() {
    const InUserName = (document.getElementById('input-user-email') as HTMLInputElement).value;
    const InPassword = (document.getElementById('input-password') as HTMLInputElement).value;
    console.log(InUserName, InPassword);
    if (!(0 || InUserName.length === 0 || InPassword.length === 0)) { this.showToast(); this.router.navigateByUrl('/tabs'); }
    else { this.presentAlert(); }


    this.api.usernameDisponible(InUserName).subscribe((data: any) => {
      console.log(data.value);
    });

  }

  async presentAlert() {
    const alert = this.alertController.create({
      header: 'Login Fallit',
      subHeader: 'L Usuari, email o contrasenya introduit no correspon amb ningun usuari de la base de dades',
      buttons: ['Okei']
    });
    (await alert).present();
  }
  
  async showToast() {
    this.toast = this.toastController.create({
      message: 'Login successfully',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Close',
      duration: 1000,
    });
    (await this.toast).present();
  }
  HideToast() {
    this.toast = this.toastController.dismiss();
  }

  ngOnInit() {
    // Mirar a la base de dades si te el toquen
    // si el te anar a la seguent pagina
    if (0) { this.router.navigateByUrl('/tabs'); }
  }
}
