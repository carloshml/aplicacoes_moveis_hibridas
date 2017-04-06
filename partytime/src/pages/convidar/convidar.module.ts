import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Convidar } from './convidar';

@NgModule({
  declarations: [
    Convidar,
  ],
  imports: [
    IonicPageModule.forChild(Convidar),
  ],
  exports: [
    Convidar
  ]
})
export class ConvidarModule {}
