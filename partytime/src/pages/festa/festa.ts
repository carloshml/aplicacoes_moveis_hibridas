import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Festa page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-festa',
  templateUrl: 'festa.html',
})
export class Festa {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Festa');
  }

  goToFestaDetalhes() {
    // go to the MyPage component
    this.navCtrl.push('FestaDetalhes');
  }

}
