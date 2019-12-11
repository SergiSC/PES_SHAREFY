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

  setNoti(user, tok, tokenf) {
    const body = {
      token: tok,
      token_notification: tokenf
    };
    return this.http.post(
        this.url + '/api/user/' +  user + '/token_notification',
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

  postUsuariRegistrat(emai) {
    const body = {
      email: emai
    };
    return this.http.post(
        this.url + '/api/login/google',
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
      birth_date: user.birth_date,
      email: user.email, // TODO: MIRAR SI VA AL BACKEND
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

  getEvents() {
    return this.http.get(
      'http://event-app.ml:5000/api/events/search?tags=Games'
    );
  }

  getGamePublications(idg) {
    return this.http.get(
      this.url + '/api/game/' + idg + '/publications'
    );
  }

  getGameDescription(idg, lang) {
    if (lang === 'cat') {
      return this.http.get(
        this.url + '/api/game/' + idg + '/lang/ca'
      );
    } else if (lang === 'es') {
      return this.http.get(
        this.url + '/api/game/' + idg + '/lang/es'
      );
    } else {
      return this.http.get(
        this.url + '/api/game/' + idg + '/lang/en'
      );
    }
  }

  AddComment(user, id, tok, tex) {
    const body = {
      text: tex,
      token: tok
    };
    return this.http.post(
      this.url + '/api/comment/user/' + user + '/publication/' + id,
      body,
    );
  }

  DeleteComment(id, tok) {
    return this.http.delete(
      this.url + '/api/comment/' + id + '?token=' + tok,
    );
  }
  deletePublication(id, token) {
    return this.http.delete(
      this.url + '/api/publication/' + id + '?token=' + token
    );
  }

  IsFollowing(follower, following, tok) {
    return this.http.get(
      this.url + '/api/follow/user/' + follower + '/user/' + following + '?token=' + tok
    );
  }

  Seguir(follower, following, tok) {
    const body = {
      follower_username: follower,
      token: tok
    };
    console.log(follower, following);
    return this.http.post(
      this.url + '/api/follow/user/' + following,
      body,
    );
  }

  DeixardeSeguir(follower, following, tok) {
    return this.http.delete(
      this.url + '/api/follow/user/' + follower + '/user/' + following + '?token=' + tok
    );
  }

  Followers(id, tok) {
    return this.http.get(
      this.url + '/api/user/' + id + '/followers' + '?token=' + tok
    );
  }

  Following(id, tok) {
    return this.http.get(
      this.url + '/api/user/' + id + '/followed' + '?token=' + tok
    );
  }
  getUsuarisIPublicacions(data,tok) {
    return this.http.get(this.url + '/api/search/' + data + '?token=' + tok);
  }
  inviteGame(joc, userReciver, userEmiter, tok) {
    const body = {
      token: tok
    };
    return this.http.post(
      this.url + '/api/notification/invite/' + userEmiter + '/' + joc + '/' + userReciver,
      body
    );
  }

  getCommentsPubliId(id, tok) {
    return this.http.get(
      this.url + '/api/comments/publication/' + id + '?token=' + tok
    );
  }

  getLikesPubliId(id, tok) {
    return this.http.get(
      this.url + '/api/publication/' + id + '/likes' + '?token=' + tok
    );
  }
}
