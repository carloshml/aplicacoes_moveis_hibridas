import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Festa} from '.././festa/festa';

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

  festaSelecionada ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public festa: Festa) {
    this.festaSelecionada = festa.selectedFesta;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FestaDetalhes');
  }

  goToConvidar() {
    // go to the MyPage component
    this.navCtrl.push('Convidar');
  }

}
