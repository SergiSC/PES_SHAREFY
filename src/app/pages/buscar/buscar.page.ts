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
  resultatsFiltrats = []

  constructor(private api: ApiService) { }

  comprovarEntrada() {
    this.resultatsFiltrats = []
    if (this.entradaBuscador.length > 1) {
      this.api.getAllUsers().subscribe((data:any) => {
        data.list.forEach(element => {
          if (element.username.toLowerCase().includes(this.entradaBuscador.toLowerCase())) {
            let result = {
              nom: element.username,
              foto: '',
              tipus: 'usuari'
            }
            this.resultatsFiltrats.push(result)
          }
        })
      })
      this.api.getAllGames().subscribe((data:any) => {
        data.value.forEach(element => {
          if (element.name.toLowerCase().includes(this.entradaBuscador.toLowerCase())) {
            let result = {
              nom: element.name,
              foto: '',
              tipus: 'joc'
            }
            this.resultatsFiltrats.push(result)
          }
        })
      })
      this.resultatsFiltrats.sort((a,b) => (a.nom.toLowerCase() > b.nom.toLowerCase()) ? 1 : ((b.nom.toLowerCase() < a.nom.toLowerCase()) ? -1 : 0)); 
    }
  }

  ngOnInit() {
  }

}
