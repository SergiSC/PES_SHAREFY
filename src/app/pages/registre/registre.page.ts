import { Component, OnInit } from '@angular/core';

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

  checkEmailFormat() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(this.regEmail).toLowerCase()));
    return re.test(String(this.regEmail).toLowerCase());
  }
}
