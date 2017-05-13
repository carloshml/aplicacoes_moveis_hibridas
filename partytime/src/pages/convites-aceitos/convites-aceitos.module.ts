import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvitesAceitos } from './convites-aceitos';

@NgModule({
  declarations: [
    ConvitesAceitos,
  ],
  imports: [
    IonicPageModule.forChild(ConvitesAceitos),
  ],
  exports: [
    ConvitesAceitos
  ]
})
export class ConvitesAceitosModule {}
