import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})

export class PendingPage implements OnInit {

  listPending = [];
  pathFotoPerfil = '';
  url = 'http://sharefy.tk'
  private token;
  private username;

  constructor(
    private api: ApiService,
    private storage: Storage,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.storage.get('token').then((token: any) => {
      this.token = token;
      this.storage.get('username').then((username: any) => {
        this.username = username;
        this.api.getPending(username, token).subscribe((data: any) => {
          if(data.value.length !== undefined){
            this.listPending = data.value;
          }else{
            this.listPending = [];
            this.listPending.push(data.value[1]);
          }
        });
      });
    });
  }

  deletePending(follower){
    this.api.deletePending(follower, this.username, this.token).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

  acceptPending(follower){
    this.api.acceptPending(follower, this.username, this.token).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

}