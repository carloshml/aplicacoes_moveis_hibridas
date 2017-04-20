import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeUsuario } from './home-usuario';

@NgModule({
  declarations: [
    HomeUsuario,

  ],
  imports: [
    IonicPageModule.forChild(HomeUsuario),
  ],
  exports: [
    HomeUsuario
  ],
  entryComponents: [

  ]

})
export class HomeUsuarioModule {}
