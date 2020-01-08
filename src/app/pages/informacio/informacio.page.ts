import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import {ActionSheetController, ToastController} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import {TranslateService} from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import {Router} from '@angular/router';
import {errorsInformacio} from './informacio.errors';
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';



@Component({
  selector: 'app-informacio',
  templateUrl: './informacio.page.html',
  styleUrls: ['./informacio.page.scss'],
})
export class InformacioPage implements OnInit {

  croppedImagepath = '';
  isLoading = false;
  listUsers: any;
  pathFotoPerfil = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
  regNick: any;
  regName: any;
  regLastname: any;
  regEmail: any;
  regDate: any;
  missatgeErrorNick = [];
  missatgeErrorMail = [];
  missatgeErrorPassword = [];
  missatgeErrorPasswordRep = [];
  oldMail: any;
  listMail: any;
  err = new errorsInformacio(this.translate);
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  fileTransfer: FileTransferObject;

  constructor(
      private router: Router,
      private toastController: ToastController,
      private camera: Camera,
      public actionSheetController: ActionSheetController,
      private file: File,
      private translate: TranslateService,
      private storage: Storage,
      private api: ApiService,
      private path: FilePath,
      private transfer: FileTransfer
  ) { }

  ngOnInit() {
    this.api.getAllUsers().subscribe((data: any) => {
      this.listUsers = data.list;
    });
    this.api.getAllEmails().subscribe((data: any) => {
      this.listMail = data.list;
    });
    this.storage.get('token').then((token: any) => {
      this.storage.get('username').then((username: any) => {
        this.api.recuperarInfoUser(username, token).subscribe((data: any) => {
          if (data.value[0].photo_path !== null) {
            this.pathFotoPerfil = 'http://www.sharefy.tk' + data.value[0].photo_path;
          }
          console.log(data.value[0]);
          this.regNick = data.value[0].username;
          this.regName =  data.value[0].first_name;
          this.regLastname = data.value[0].last_name;
          this.regEmail = data.value[0].email;
          this.regDate = data.value[0].birth_date;
          this.oldMail = data.value[0].email;
        });
      });
    });
  }


  pickImage(sourceTypee) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceTypee,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      const img = imageData;
      this.storage.get('token').then(tok => {
        this.storage.get('username').then(usr => {
          this.api.setPhoto(usr, tok, img).subscribe(data => console.log(data));

          this.path.resolveNativePath(img).then((result) => {
            this.fileTransfer = this.transfer.create();
            const pathName = result.split('/');
            const name = pathName[pathName.length - 1];
            // tslint:disable-next-line:no-shadowed-variable
            const options: FileUploadOptions = {
              fileKey: 'photo',
              fileName: name,
              httpMethod: 'POST',
              params: {
                token: tok,
              },
            };
            if (result.endsWith('.png') || result.endsWith('.jpg')) {
              this.fileTransfer.upload(result, 'http://sharefy.tk/api/' + usr + 'photo', options, true).then(data => {
              }, (err) => {
                console.log(err);
              });
            }
          });
        });
      });
    }, (err) => {});
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header:  this.translate.instant('PAGE.INFORMACIO.SELECCIO'),
      buttons: [{
        text: this.translate.instant('PAGE.INFORMACIO.LIBRARY'),
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
        {
          text: this.translate.instant('PAGE.INFORMACIO.CAMERA'),
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    await actionSheet.present();
  }


  guardarInfo() {
    if (!this.validInputs()) {
      this.showToast(this.err.alerts[1].msg);
    } else {
      const user = {
        username: this.regNick,
        first_name: this.regName,
        last_name: this.regLastname,
        email: this.regEmail,
        birth_date: this.regDate.substring(0, 10)
      };
      this.storage.get('token').then(tok => {
        this.storage.get('username').then(usr => {
          this.api.guardarInfoUser(usr, user, tok).subscribe((data: any) => {
            this.storage.set('username', user.username);
            this.showToast(this.err.alerts[0].msg);
          }, err => {
            this.showToast(this.err.alerts[2].msg);
          });
        });
      });
    }
  }

  validInputs() {
    return !(this.regNick === undefined || this.regNick === ''
        || this.regName === undefined || this.regName === ''
        || this.regLastname === undefined || this.regLastname === ''
        || this.regEmail === undefined || this.regEmail === ''
        || this.regDate === undefined || this.regDate === ''
        || this.missatgeErrorNick.length > 0 || this.missatgeErrorMail.length > 0 ||
        this.missatgeErrorPassword.length > 0 || this.missatgeErrorPasswordRep.length
        > 0);
  }

  checkNickName() {
    this.missatgeErrorNick = [];
    const labelNick = document.getElementById('item-input-nick');
    if (this.regNick.length < 3 || this.regNick.length > 20) {
      this.missatgeErrorNick.push(this.err.errors[0].msg);
    } else {
      this.storage.get('username').then((data: any) => {
        this.listUsers.forEach(element => {
          if (element.username.toLowerCase() === this.regNick.toLowerCase() && this.regNick.toLowerCase() !== data.toString().toLocaleLowerCase()) {
            this.missatgeErrorNick.push(this.err.errors[1].msg);
          }
        });
      });
      const re = /^([a-zA-Z0-9 _-]+)$/;
      if (!re.test(String(this.regNick).toLowerCase())) {
        this.missatgeErrorNick.push(this.err.errors[2].msg);
      }
    }
    if (this.missatgeErrorNick.length === 0) {
      labelNick.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelNick.setAttribute('style', '--highlight-background: red !important;');
    }
  }

  checkEmailFormatAndDisponibility() {
    const labelMail = document.getElementById('item-input-mail');
    this.missatgeErrorMail = [];
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(this.regEmail).toLowerCase())) {
      this.missatgeErrorMail.push(this.err.errors[3].msg);
    }

    this.listMail.forEach(element => {
      if (element.email.toLowerCase() === this.regEmail.toLowerCase() && element.email.toLowerCase() !== this.oldMail.toString().toLocaleLowerCase()) {
        this.missatgeErrorMail.push(this.err.errors[7].msg);
      }
    });
    if (this.missatgeErrorMail.length === 0) {
      labelMail.setAttribute('style', '--highlight-background: var(--ion-color-primary) !important;');
    } else {
      labelMail.setAttribute('style', '--highlight-background: red !important;');
    }
  }
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      duration: 3000,
    });
    await toast.present();
  }
}
