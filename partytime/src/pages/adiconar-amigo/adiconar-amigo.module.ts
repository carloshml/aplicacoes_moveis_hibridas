import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdiconarAmigo } from './adiconar-amigo';

@NgModule({
  declarations: [
    AdiconarAmigo,
  ],
  imports: [
    IonicPageModule.forChild(AdiconarAmigo),
  ],
  exports: [
    AdiconarAmigo
  ]
})
export class AdiconarAmigoModule {}
