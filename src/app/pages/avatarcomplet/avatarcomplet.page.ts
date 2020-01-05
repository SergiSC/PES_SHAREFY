import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avatarcomplet',
  templateUrl: './avatarcomplet.page.html',
  styleUrls: ['./avatarcomplet.page.scss'],
})
export class AvatarcompletPage implements OnInit {

  nomUser: String;
  pathFotoPerfil: string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.nomUser = data.nomUser;
      this.pathFotoPerfil = data.pathFotoPerfil;
    });
  }

}
