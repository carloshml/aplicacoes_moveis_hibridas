import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Amigos } from './amigos';

@NgModule({
  declarations: [
    Amigos,
  ],
  imports: [
    IonicPageModule.forChild(Amigos),
  ],
  exports: [
    Amigos
  ]
})
export class AmigosModule {}
