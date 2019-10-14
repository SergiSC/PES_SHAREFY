import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions: any;
  public token: string;

  url = 'sharefy.tk';

  constructor(private http: HttpClient) {}

  recuperarToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: this.token
      })
    };
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
}
