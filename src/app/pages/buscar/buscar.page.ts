import { Component, OnInit } from '@angular/core';
import { AttrAst } from '@angular/compiler';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  entradaBuscador: string
  resultatsFiltrats = []
  resultatsEnsenyats = []
  customActionSheetTipus: any = {
    header: this.translate.instant('PAGE.BUSCAR.TEXTLABELALERT1'),
  };
  customActionSheetPrioritat: any = {
    header: this.translate.instant('PAGE.BUSCAR.TEXTLABELALERT2'),
  };

  selectTipus = 'totes'
  selectPrioritat = 'recents'

  constructor(private api: ApiService,
              private translate: TranslateService,
              private router: Router,
              private storage: Storage) { }

  comprovarEntrada() {
    this.resultatsFiltrats = []
    this.resultatsEnsenyats = []
    if (this.entradaBuscador.length > 1) {

      this.storage.get('username').then((usr) => {
        this.storage.get('token').then((tk) => {
          this.api.getUsuarisIPublicacions(this.entradaBuscador.toLowerCase(),tk).subscribe((data:any) => {
            data.publications.forEach(element => {
              let result = {
                text: element.text,
                id: element.id,
                foto: '../../../assets/icon/play-button.png',
                tipus: "publicacio",
                likes: element.likes,
                data: new Date(element.created_at)
              }
              this.resultatsFiltrats.push(result)
              if (this.selectTipus === 'publicacions') this.ordenaPer()
            })
            data.users.forEach(element => {
              let result = {
                text: element.username,
                id: element.id,
                foto: '',
                tipus: "usuari"
              }
              if (element.photo_path === null) {
                result.foto = '../../../assets/icon/user_profile.png'
              }
              else {
                result.foto = 'http://www.sharefy.tk' + element.photo_path
              }
              this.resultatsFiltrats.push(result)
              if (this.selectTipus === 'usuaris') this.ordenaPer()
            })
          })
        });
      });
      this.api.getAllGames().subscribe((data:any) => {
        data.value.forEach(element => {
          if (element.name_en.toLowerCase().includes(this.entradaBuscador.toLowerCase())) {
            let result = {
              text: element.name_en,
              id: element.id,
              foto: element.image_url,
              tipus: 'joc',
              descripcio: element.description_en
            }
            this.resultatsFiltrats.push(result)
            if (this.selectTipus === 'jocs') this.ordenaPer()
          }
        })
      })
    }
    if (this.selectTipus == 'totes') this.ordenaPer()

  }

  redirectJoc(joc) {
    const jocParams = { 
      imag: joc.foto, 
      desc: joc.descripcio, 
      name: joc.text, 
      idg: joc.id 
    };
    this.router.navigate(['/perfiljoc', jocParams]);
  }

  redirectPublicacio(publicacioId) {
    const edit = {
      idp: publicacioId
    };
    this.router.navigate(['/vistapublicacio', edit]);
  }

  redirectUsuari(nom) {
    const user = {
      nom: nom
    };
    this.router.navigate(['/perfiluser', user]);
  }

  ordenaPer() {
    this.resultatsEnsenyats = []
    if (this.selectTipus === 'usuaris') {
      this.resultatsFiltrats.forEach(element => {
        if (element.tipus === 'usuari') {
          this.resultatsEnsenyats.push(element)
        }
      })
    }
    else if (this.selectTipus === 'jocs') {
      this.resultatsFiltrats.forEach(element => {
        if (element.tipus === 'joc') {
          this.resultatsEnsenyats.push(element)
        }
      })
    }
    else if (this.selectTipus === 'publicacions') {
      this.resultatsFiltrats.forEach(element => {
        if (element.tipus === 'publicacio') {
          this.resultatsEnsenyats.push(element)
        }
      })
      if (this.selectPrioritat === 'recents') {
        this.resultatsEnsenyats.sort(function(a,b){return b.data - a.data});
      }
      else if (this.selectPrioritat === 'antigues') {
        this.resultatsEnsenyats.sort(function(a,b){return a.data - b.data});
      }
      else {
        this.resultatsFiltrats.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)); 
      }
    }
    //ALL
    else {
      this.resultatsEnsenyats = this.resultatsFiltrats
    }
  }

  ngOnInit() {
  }

}
