import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Festa } from './festa';

@NgModule({
  declarations: [
    Festa,
  ],
  imports: [
    IonicPageModule.forChild(Festa)
  ],
  exports: [
    Festa
  ]
})
export class FestaModule {}
