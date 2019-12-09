import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfiluserPage } from './perfiluser.page';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {customTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalconvidarPage } from '../modalconvidar/modalconvidar.page';

const routes: Routes = [
  {
    path: '',
    component: PerfiluserPage
  }
];

@NgModule({
  entryComponents: [
    ModalconvidarPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [PerfiluserPage, ModalconvidarPage]
})
export class PerfiluserPageModule {}
