import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
