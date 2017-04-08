import { Component } from '@angular/core';
import { IonicPage,AlertController, LoadingController,Loading, NavController } from 'ionic-angular';
import { CriarNovaConta } from '../criar-nova-conta/criar-nova-conta';
import { HomeUsuario } from '../home-usuario/home-usuario';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-tela-login',
  templateUrl: 'tela-login.html'
})
export class TelaLogin {  loading: Loading;
  registerCredentials = {email: '', password: ''};
  FB_APP_ID: number = 1862402434040217;

  constructor(private fb: Facebook, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public createAccount() {
    this.nav.push(CriarNovaConta);
  }

  fbLogin(): void {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) =>  {
          this.goHomeUsuario()
        })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  public goHomeUsuario() {
      this.nav.setRoot(HomeUsuario)
  }


  showLoading() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.loading.present();
}







}
