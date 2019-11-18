import { Component, OnInit } from '@angular/core';
import { AttrAst } from '@angular/compiler';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  users = [
    {
      nom: 'AA',
    },
    {
      nom: 'BB'
    },
    {
      nom: 'CC'
    },
    {
      nom: 'DD'
    },
    {
      nom: 'EE'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
