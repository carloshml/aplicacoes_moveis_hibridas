import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TelaLogin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tela-login',
  templateUrl: 'tela-login.html',
})
export class TelaLogin {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TelaLogin');
  }

  goToHome() {
    // go to the MyPage component
    this.navCtrl.push('HomeUsuario');
  }

  goToCriarNovaConta() {
    // go to the MyPage component
    this.navCtrl.push('CriarNovaConta');
  }

}
