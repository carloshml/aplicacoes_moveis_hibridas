import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TelaLogin } from '../pages/tela-login/tela-login';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CriarNovaConta } from '../pages/criar-nova-conta/criar-nova-conta';
import { HomeUsuario } from '../pages/home-usuario/home-usuario';

import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    TelaLogin,
    ListPage,
    CriarNovaConta,
    HomeUsuario
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TelaLogin,
    ListPage,
    CriarNovaConta,
    HomeUsuario,
    TelaLogin
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
