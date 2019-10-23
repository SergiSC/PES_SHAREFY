import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PublicacioComponent } from '../shared/publicacio/publicacio.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    PublicacioComponent,
  ],
  exports: [
    PublicacioComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
