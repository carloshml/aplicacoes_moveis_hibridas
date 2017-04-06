import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FestaDetalhes } from './festa-detalhes';

@NgModule({
  declarations: [
    FestaDetalhes,
  ],
  imports: [
    IonicPageModule.forChild(FestaDetalhes),
  ],
  exports: [
    FestaDetalhes
  ]
})
export class FestaDetalhesModule {}
