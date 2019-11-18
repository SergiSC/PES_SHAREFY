import { Component, OnInit } from '@angular/core';
import { AttrAst } from '@angular/compiler';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  entradaBuscador: string
  users = [
    {
      nom: 'ser',
    },
    {
      nom: 'serg'
    },
    {
      nom: 'serra'
    },
    {
      nom: 'serran'
    },
    {
      nom: 'serrano'
    }
  ]
  usuarisFiltrats = []

  constructor(private api: ApiService) { }

  comprovarEntrada() {
    this.usuarisFiltrats = []
    if (this.entradaBuscador.length > 1) {
      this.api.getAllUsers().subscribe((data:any) => {
        data.list.forEach(element => {
          if (element.username.toLowerCase().includes(this.entradaBuscador.toLowerCase())) {
            this.usuarisFiltrats.push(element)
          }
        })
      })
    }
  }

  ngOnInit() {
  }

}
