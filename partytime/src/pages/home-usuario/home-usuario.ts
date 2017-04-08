import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TelaLogin} from '.././tela-login/tela-login'


/**
 * Generated class for the HomeUsuario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home-usuario',
  templateUrl: 'home-usuario.html',
})
export class HomeUsuario {



  username = '';
  email = '';
  constructor(private navCtrl: NavController) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUsuario');
  }

  goToFesta() {
    // go to the MyPage component
    this.navCtrl.push('Festa');
  }

  goToCriarFesta() {
    // go to the MyPage component
    this.navCtrl.push('CriarFesta');
  }
  goToConvites() {
    // go to the MyPage component
    this.navCtrl.push('Convites');
  }

  goToAmigos() {
    // go to the MyPage component
    this.navCtrl.push('Amigos');
  }

  logout(){
    this.navCtrl.push(TelaLogin);
  }


}
