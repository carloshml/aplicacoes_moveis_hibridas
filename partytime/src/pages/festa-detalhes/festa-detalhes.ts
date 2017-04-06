import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FestaDetalhes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-festa-detalhes',
  templateUrl: 'festa-detalhes.html',
})
export class FestaDetalhes {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FestaDetalhes');
  }

  goToConvidar() {
    // go to the MyPage component
    this.navCtrl.push('Convidar');
  }

}
