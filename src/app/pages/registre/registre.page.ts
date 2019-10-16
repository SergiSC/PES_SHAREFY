import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.page.html',
  styleUrls: ['./registre.page.scss'],
})
export class RegistrePage implements OnInit {

  regNick = ""
  regNameSurname = ""
  regEmail = ""
  regDate = ""
  regPassword = ""
  regPasswordRepeat = ""
  showAlert = false
  mockedListUsers = ['aaa','aaab', 'sergi', 'serrano']

  constructor() { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.regNick)
    console.log(this.regNameSurname)
    console.log(this.regEmail)
    console.log(this.regDate)
    console.log(this.regPassword)
    console.log(this.regPasswordRepeat)
  }

  equalPasswords() {
    if (this.regPassword !== this.regPasswordRepeat) return false;
    else return true;
  }

  checkExistingNick() {
    if (this.regNick.length > 2){
      this.mockedListUsers.forEach(element =>{
        console.log('11')
        if (element.toLowerCase() === this.regNick.toLowerCase()) {
          console.log('same nick');
          const labelNick = document.getElementById('item-input-nick')
          labelNick.setAttribute('style','--highlight-color-focused: red;')
        }
      })
    }
  }

  checkEmailFormat() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let message = "El format del correu electrónic no es vàlid"
    if (!re.test(String(this.regEmail).toLowerCase())) {
      this.presentToastWithOptions(message)
    }
    console.log(re.test(String(this.regEmail).toLowerCase()));
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
