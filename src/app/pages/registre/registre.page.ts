import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { errorsRegistre } from './registre.errors';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {

  regNick = ""
  regName = ""
  regLastname = ""
  regEmail = ""
  regDate = ""
  regPassword = ""
  regPasswordRepeat = ""
  listUsers: any

  errorRegistre = new errorsRegistre
  missatgeErrorNick = []
  missatgeErrorMail = []
  missatgeErrorPassword = []
  missatgeErrorPasswordRep = []

  constructor(public api: ApiService) { 
  }

  ngOnInit() {
    this.api.getAllUsers().subscribe((data:any) =>{
      this.listUsers = data.list;
    });
  }

  registerUser() {
    if (this.regNick === "" || this.regName === "" || this.regLastname === "" || this.regEmail === "" || this.regDate === "" || this.regPassword === "" || this.regPasswordRepeat === ""
        || this.missatgeErrorNick.length > 0 || this.missatgeErrorMail.length > 0 || this.missatgeErrorPassword.length > 0 || this.missatgeErrorPasswordRep.length > 0) {
      let msg = "Hi ha camps que no són correctes o no estan complets"
      this.presentToastWithOptions(msg)
    }
    else {
      let user = {
        username: this.regNick,
        first_name: this.regName,
        last_name: this.regLastname,
        email: this.regEmail,
        password: this.regPassword
      }
      this.api.postAfegirNouUsuariRegistrat(user).subscribe((data:any) => {
        console.log(data)   // data = token
      })
    }
  }

  checkNickName() {
    this.missatgeErrorNick = []
    const labelNick = document.getElementById('item-input-nick')
    
    //Check lenght nickname
    if (this.regNick.length < 3 || this.regNick.length > 20) {
      this.missatgeErrorNick.push(this.errorRegistre.errors[0].msg)
    }
    else {
      //Check nick used by other user
      this.listUsers.forEach(element =>{
        if (element.username.toLowerCase() === this.regNick.toLowerCase()) {
          this.missatgeErrorNick.push(this.errorRegistre.errors[1].msg);
        }
      })
      
      //Check correct input form
      let re = /^([a-zA-Z0-9 _-]+)$/
      if (!re.test(String(this.regNick).toLowerCase())) {
        this.missatgeErrorNick.push(this.errorRegistre.errors[2].msg)
      }
    }

    if (this.missatgeErrorNick.length === 0) {
      labelNick.setAttribute('style','--highlight-background: var(--ion-color-primary) !important;')
    }
    else {
      labelNick.setAttribute('style','--highlight-background: red !important;')
    }
  }

  checkEmailFormat() {
    const labelMail = document.getElementById('item-input-mail')
    this.missatgeErrorMail = []
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(this.regEmail).toLowerCase())) {
      this.missatgeErrorMail.push(this.errorRegistre.errors[3].msg)
    }
    if (this.missatgeErrorMail.length === 0) {
      labelMail.setAttribute('style','--highlight-background: var(--ion-color-primary) !important;')
    }
    else {
      labelMail.setAttribute('style','--highlight-background: red !important;')
    }
  }

  checkPasswordFormat() {
    const labelPassword = document.getElementById('item-input-password')
    this.missatgeErrorPassword = []

    if (this.regPassword.length < 8) this.missatgeErrorPassword.push(this.errorRegistre.errors[4].msg)

    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (this.regPassword.match(re) === null) {
      this.missatgeErrorPassword.push(this.errorRegistre.errors[5].msg)
    }
    if (this.missatgeErrorPassword.length === 0) {
      labelPassword.setAttribute('style','--highlight-background: var(--ion-color-primary) !important;')
    }
    else {
      labelPassword.setAttribute('style','--highlight-background: red !important;')
    }
  }

  checkSamePasswords() {
    const labelPasswordRep = document.getElementById('item-input-password-rep')
    this.missatgeErrorPasswordRep = []
    
    if (this.regPasswordRepeat !== this.regPassword) this.missatgeErrorPasswordRep.push(this.errorRegistre.errors[6].msg)

    if (this.missatgeErrorPasswordRep.length === 0) {
      labelPasswordRep.setAttribute('style','--highlight-background: var(--ion-color-primary) !important;')
    }
    else {
      labelPasswordRep.setAttribute('style','--highlight-background: red !important;')
    }
  }

  async presentToastWithOptions(message) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.position = 'top';
    toast.duration = 2000;
    toast.color = 'danger';
    toast.buttons = [
      {
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];
  
    document.body.appendChild(toast);
    return toast.present();
  }
  
}
