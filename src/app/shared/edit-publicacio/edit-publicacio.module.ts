import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPublicacioPage } from './edit-publicacio.page';

const routes: Routes = [
  {
    path: '',
    component: EditPublicacioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPublicacioPage]
})
export class EditPublicacioPageModule {}
