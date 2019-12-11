import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CanviarContraPage } from './canviar-contra.page';

const routes: Routes = [
  {
    path: '',
    component: CanviarContraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CanviarContraPage]
})
export class CanviarContraPageModule {}
