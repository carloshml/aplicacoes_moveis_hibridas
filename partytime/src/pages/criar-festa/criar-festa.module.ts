import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarFesta } from './criar-festa';

@NgModule({
  declarations: [
    CriarFesta,
  ],
  imports: [
    IonicPageModule.forChild(CriarFesta),
  ],
  exports: [
    CriarFesta
  ]
})
export class CriarFestaModule {}
