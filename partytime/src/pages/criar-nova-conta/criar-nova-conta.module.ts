import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarNovaConta } from './criar-nova-conta';

@NgModule({
  declarations: [
    CriarNovaConta,
  ],
  imports: [
    IonicPageModule.forChild(CriarNovaConta),
  ],
  exports: [
    CriarNovaConta
  ]
})
export class CriarNovaContaModule {}
