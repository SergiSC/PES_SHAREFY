import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VistaPublicacioPage } from './vista-publicacio.page';

const routes: Routes = [
  {
    path: '',
    component: VistaPublicacioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VistaPublicacioPage]
})
export class VistaPublicacioPageModule {}
