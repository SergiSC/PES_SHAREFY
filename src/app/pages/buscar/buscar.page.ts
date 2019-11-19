import { Component, OnInit } from '@angular/core';
import { AttrAst } from '@angular/compiler';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  entradaBuscador: string
  resultatsFiltrats = []

  constructor(private api: ApiService,
              private translate: TranslateService,
              private router: Router) { }

  comprovarEntrada() {
    this.resultatsFiltrats = []
    if (this.entradaBuscador.length > 1) {
      this.api.getAllUsers().subscribe((data:any) => {
        data.list.forEach(element => {
          if (element.username.toLowerCase().includes(this.entradaBuscador.toLowerCase())) {
            let result = {
              nom: element.username,
              foto: '../../assets/icon/face.png', //provisional fins que el endpoint proporcioni la img
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
              foto: element.image_url,
              tipus: 'joc'
            }
            this.resultatsFiltrats.push(result)
          }
        })
      })
      let result = {
        nom: 'Pentakill',
        foto: '../../assets/icon/penta.png',
        tipus: 'categoria'
      }
      this.resultatsFiltrats.push(result)
      this.resultatsFiltrats.sort((a,b) => (a.nom.toLowerCase() < b.nom.toLowerCase()) ? 1 : ((b.nom.toLowerCase() > a.nom.toLowerCase()) ? -1 : 0)); 
    }
  }

  redirectCategoria(categoria) {
    this.router.navigateByUrl('/categoria/' + categoria);
  }

  ngOnInit() {
  }

}
