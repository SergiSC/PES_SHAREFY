import { Component, OnInit } from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {Storage} from '@ionic/storage';
import {ApiService} from '../../services/api.service';
import {LoadingController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-afegir',
  templateUrl: './afegir.page.html',
  styleUrls: ['./afegir.page.scss'],
})
export class AfegirPage implements OnInit {
  fileTransfer: FileTransferObject;
  token;
  id;
  games;
  loading;
  newSel;
  desc;
  canN = false;
  customPopoverOptions: any = {
    header: this.translate.instant('PAGE.MODALCONVIDAR.PLACEHOLDERSELECT'),
  };
  constructor(private file: File, private transfer: FileTransfer, private translate: TranslateService, private chooser: FileChooser,
              private opener: FileOpener, private path: FilePath, private storage: Storage,
              private  api: ApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      this.games = data.value;
    });
    this.storage.get('username').then((usr) => {
      this.storage.get('token').then((tk) => {
        this.api.recuperarInfoUser(usr, tk).subscribe((d: any) => {
          this.id = d.value[0].id;
          this.token = tk;
        });
      });
    });
  }
  UploatFile() {
    if ((this.desc !== undefined || this.desc !== '') && this.newSel !== undefined) {
      let id;
      const a = this.newSel.slice(1,-1);
      for (const game of this.games) {
        if (game.name_en === a) {
          id = game.id;
        }
      }
      this.storage.get('username').then((usr) => {
        this.storage.get('token').then((tk) => {
          this.api.recuperarInfoUser(usr, tk).subscribe((d: any) => {
            const idu = d.value[0].id;
            console.log(idu, 'ID_USER');
            this.chooser.open().then((uri) => {
              this.path.resolveNativePath(uri).then((result) => {
                this.fileTransfer = this.transfer.create();
                const pathName = result.split('/');
                const name = pathName[pathName.length - 1];
                const options: FileUploadOptions = {
                  fileKey: 'video',
                  fileName: name,
                  httpMethod: 'POST',
                  params: {
                    id_user: idu,
                    game: id,
                    text: this.desc,
                    token: tk,
                  },
                  mimeType: 'video/mp4'
                };
                this.presentLoading();
                if (result.endsWith('.mp4')) {
                  this.fileTransfer.upload(result, 'http://sharefy.tk/api/publication', options, true).then(data => {
                  this.loading.dismiss();
                  alert(this.translate.instant('PAGE.ADD.MESSAGECORRECT'));
                  }, (err) => {
                  console.log(err);
                  });
                } else {
                  alert(this.translate.instant('PAGE.ADD.MESSAGEWRONG'));
                }
              });
            });
          });
        });
      });
    } else {
      alert('Completa els camps!');
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Wait',
      duration: 10000
    });
    await this.loading.present();
  }
}
