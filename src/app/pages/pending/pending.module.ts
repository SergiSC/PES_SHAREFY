import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {customTranslateLoader} from '../../app.module';
import { IonicModule } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

import { PendingPage } from './pending.page';

const routes: Routes = [
  {
    path: '',
    component: PendingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [PendingPage]
})
export class PendingPageModule {}
