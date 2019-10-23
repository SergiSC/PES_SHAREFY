import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-informacio',
  templateUrl: './informacio.page.html',
  styleUrls: ['./informacio.page.scss'],
})
export class InformacioPage implements OnInit {

  croppedImagepath = '';
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(
      private camera: Camera,
      public actionSheetController: ActionSheetController,
      private file: File,
      private translate: TranslateService
  ) { }

  ngOnInit(): void {
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header:  this.translate.instant('PAGE.IEWDN:EQWLKDA'),
      buttons: [{
        text: this.translate.instant('LOAD FROM LIBRARY '),
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
        {
          text: this.translate.instant('USE CAMERA'),
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  guardar() {

  }
}
