import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelaLogin } from './tela-login';

@NgModule({
  declarations: [
    TelaLogin,
  ],
  imports: [
    IonicPageModule.forChild(TelaLogin),
  ],
  exports: [
    TelaLogin
  ]
})
export class TelaLoginModule {}
