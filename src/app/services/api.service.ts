import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any;
   token: string;
   username: string;

  url = 'http://www.sharefy.tk';

  constructor(private http: HttpClient, private storage: Storage) {}

  recuperarInfoUser(user, tok) {
   return this.http.get(
        this.url + '/api/user/' +  user + '?token=' + tok,
    );
  }

  setUserConfig(user, tok, noti, privat, lang ) {
    const body = {
      token: tok,
      privacy: privat,
      notification: noti,
      language: lang
    };
    return this.http.post(
         this.url + '/api/user/' +  user + '/set_configurations',
         body
    );
  }

  usernameDisponible(name) {
    const body = {
      username: name,
    };
    return this.http.post(
        this.url + '/api/user/username',
        body,
    );
  }

  resetPassword(mail) {
    const body = {
      email: mail,
    };
    return this.http.post(
        this.url + '/api/user/reset',
        body,

    );
  }

  getAllUsers() {
    return this.http.get(this.url + '/api/users');
  }

  getAllGames() {
    return this.http.get(this.url + '/api/games');
  }

  postAfegirNouUsuariRegistrat(user) {
    const body = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      birth_date: user.birth_date,
    };
    return this.http.post(
      this.url + '/api/register',
      body
    );
  }

  login(mail, pass) {
    const body = {
      login: mail,
      password: pass
    };
    return this.http.post(
        this.url + '/api/login',
        body,
    );
  }

  getpubli(id, tok) {
    const body = {
    };
    return this.http.get(
        this.url + '/api/publication/' + id,
        body,
    );
  }

  getAllEmails() {
    return this.http.get(this.url + '/api/emails');
  }

  postSetTokenFromGoogleAuth(user, tokenGoogleAuth) {
    const body = {
      token: tokenGoogleAuth
    }
    return this.http.post(
      this.url + '/api/user/' + user + '/token_password',
      body
    )
  }

}
