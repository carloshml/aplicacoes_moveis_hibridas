import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarFesta } from './adicionar-festa';

@NgModule({
  declarations: [
    AdicionarFesta,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarFesta),
  ],
  exports: [
    AdicionarFesta
  ]
})
export class AdicionarFestaModule {}
