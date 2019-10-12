import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, 
              public alertController: AlertController) {}

  entrar(){
    let InUserName = (document.getElementById('input-user-email') as HTMLInputElement).value;
    let InPassword = (document.getElementById('input-password') as HTMLInputElement).value;
    console.log(InUserName, InPassword);
    if (!(0 || InUserName.length === 0 || InPassword.length === 0)) { this.router.navigateByUrl('/tabs');}
    else { this.presentAlert() }
    //Enviar les variabes a la base de dades i si funciona return
  }

  async presentAlert() {
    let alert = this.alertController.create({
      header: 'Login Fallit',
      subHeader: 'El Usuari, email o contrasenya introduit no correspon amb ningun usuari',
      buttons: ['Okei']
    });
    (await alert).present();
  }


  ngOnInit() {
    //Mirar a la base de dades si te el toquen
    //si el te anar a la seguent pagina
    if (0) { this.router.navigateByUrl('/tabs');}

  }

}
