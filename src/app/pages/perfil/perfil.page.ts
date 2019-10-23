import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  username: string;
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('username').then((data: string) => {
      this.username = data;
    });
  }

}
