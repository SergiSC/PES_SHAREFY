import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  username: string;
  pathFotoPerfil = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
  constructor(private storage: Storage, private api: ApiService) { }

  ngOnInit() {
    this.storage.get('username').then((data: string) => {
      this.username = data;
    });
    this.storage.get('token').then((token: any) => {
      this.storage.get('username').then((username: any) => {
        this.api.recuperarInfoUser(username, token).subscribe((data: any) => {
          if (data.value[0].photo_path !== null) {
            this.pathFotoPerfil = 'http://www.sharefy.tk' + data.value[0].photo_path;
          }
        });
        });
      });
  }

}
