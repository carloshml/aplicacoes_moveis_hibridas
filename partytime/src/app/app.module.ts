import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TelaLogin } from '../pages/tela-login/tela-login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CriarNovaConta } from '../pages/criar-nova-conta/criar-nova-conta';
import { HomeUsuario } from '../pages/home-usuario/home-usuario';
import { Festa } from '../pages/festa/festa';


import { Convidar } from '../pages/convidar/convidar';
import { Amigos } from '../pages/amigos/amigos';
import { Convites } from '../pages/convites/convites';


import { Facebook } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';

import { AuthService } from '../providers/auth.service';

export const firebaseConfig = {
  apiKey: "AIzaSyCYYWeA84r0BHA-3XHGXOIJY5QMdnZZAPs",
  authDomain: "partytime-ed98f.firebaseapp.com",
  databaseURL: "https://partytime-ed98f.firebaseio.com",
  projectId: "partytime-ed98f",
  storageBucket: "partytime-ed98f.appspot.com",
  messagingSenderId: "566516224468"
};

@NgModule({
  declarations: [
    MyApp,
    TelaLogin,
    Festa,
    CriarNovaConta,
    HomeUsuario,
    Amigos,
    Convites,
    Convidar,



  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TelaLogin,
    Festa,
    CriarNovaConta,
    HomeUsuario,
    Amigos,
    Convites,
    Convidar,
  ],
  providers: [
    AuthService,
    Festa,
    Facebook,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
