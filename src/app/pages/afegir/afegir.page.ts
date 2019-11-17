import { Component, OnInit } from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {Storage} from '@ionic/storage';
import {ApiService} from '../../services/api.service';
import {LoadingController} from '@ionic/angular';

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
  constructor(private file: File, private transfer: FileTransfer, private chooser: FileChooser,
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
                  game: 1,
                  text: this.desc,
                  token: tk,
                },
                mimeType: 'video/mp4'
              };
              console.log(idu, this.newSel, this.desc, tk);
              this.presentLoading();
              this.fileTransfer.upload(result, 'http://sharefy.tk/api/publication', options, true).then(data => {
                this.loading.dismiss();
                alert('Transfer done');
              }, (err) => {
                console.log(err);
              });
            });
          });
        });
      });
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Wait',
      duration: 10000
    });
    await this.loading.present();
  }

}
