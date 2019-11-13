import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tokenName } from '@angular/compiler';

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
         this.url + '/api/user/' +  user + '/configuration',
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

  editarPublicacio(gameN, textN, id, tokenPu) {
    const body = {
      game: gameN,
      text: textN,
      token: tokenPu
    };
    return this.http.put(
      this.url + '/api/publication/' + id,
      body,
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

  getPublicationById(id) {
    return this.http.get(
      this.url + '/api/publication/' + id
    );
  }

  getAllPublis(id, tok) {
    return this.http.get(
        this.url + '/api/user/' + id + '/publications' + '?token=' + tok,
    );
  }


  like(username, idp, tok) {
    const body = {
      token: tok
    };
    return this.http.post(
        this.url + '/api/like/user/' + username + '/publication/' + idp,
        body,
    );
  }

  dislike(username, idp, tok) {
    const body = {
      token: tok
    };
    return this.http.delete(
        this.url + '/api/like/user/' + username + '/publication/' + idp + '?token=' + tok,
    );
  }

  getAllEmails() {
    return this.http.get(this.url + '/api/emails');
  }

  postSetTokenFromGoogleAuth(user, tokenGoogleAuth) {
    const body = {
      token: tokenGoogleAuth
    };
    return this.http.post(
      this.url + '/api/user/' + user + '/token_password',
      body
    );
  }

  guardarInfoUser(olduser, user , tok) {
    const body = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      birth_date: user.birth_date, // TODO: MIRAR SI VA AL BACKEND
      token: tok
    };
    return this.http.put(
        this.url + '/api/user/' + olduser,
        body,
    );
  }

  getLike(user, tok, id) {
    return this.http.get(
        this.url + '/api/like/user/' + user + '/publication/' + id  + '?token=' + tok
    );
  }


  getComments(user, id, tok) {
    return this.http.get(
      this.url + '/api/comment/user/' + user + '/publication/' + id  + '?token=' + tok
    );
  }

  AddComment(user, id, tok, tex, dat) {
    const body = {
      text: tex,
      date: dat,
      token: tok
    };
    return this.http.post(
      this.url + '/api/comment/user/' + user + '/publication/' + id,
      body,
    );
  }

}
