import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Convites } from './convites';

@NgModule({
  declarations: [
    Convites,
  ],
  imports: [
    IonicPageModule.forChild(Convites),
  ],
  exports: [
    Convites
  ]
})
export class ConvitesModule {}
