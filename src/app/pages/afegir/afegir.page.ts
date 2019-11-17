import { Component, OnInit } from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-afegir',
  templateUrl: './afegir.page.html',
  styleUrls: ['./afegir.page.scss'],
})
export class AfegirPage implements OnInit {
  fileTransfer: FileTransferObject;
  constructor(private file: File, private transfer: FileTransfer, private chooser: FileChooser,
              private opener: FileOpener, private path: FilePath, private storage: Storage) { }

  ngOnInit() {

  }

  UploatFile() {
    this.storage.get('username').then((usr) => {
      this.storage.get('token').then((tk) => {
        this.chooser.open().then((uri) => {
          console.log(uri);
          this.path.resolveNativePath(uri).then((result) => {
            this.fileTransfer = this.transfer.create();
            const options: FileUploadOptions = {
              fileKey: 'video',
              fileName: 'video.mp4',
              httpMethod: 'POST',
              params: {
                id_user: usr,
                game: 1,
                text: 'Test1',
                token: tk,
              },
              mimeType: 'video/mp4'
            };
            console.log(result.substr(7, result.length - 1));
            this.fileTransfer.upload(result.substr(7, result.length - 1), 'http://sharefy.tk/api/publication', options).then(data => {
              alert('Transfer done');
            }, (err) => {
              console.log(err);
            });
            this.fileTransfer.upload(result, 'http://sharefy.tk/api/publication', options).then(data => {
              alert('Transfer done');
            }, (err) => {
              console.log(err);
            });
          });
        });
      });
    });
  }

}
