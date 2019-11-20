import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {customTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';

import { PerfiljocPage } from './perfiljoc.page';

const routes: Routes = [
  {
    path: '',
    component: PerfiljocPage
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
  declarations: [PerfiljocPage]
})
export class PerfiljocPageModule {}
