import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvatarcompletPage } from './avatarcomplet.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarcompletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvatarcompletPage]
})
export class AvatarcompletPageModule {}
