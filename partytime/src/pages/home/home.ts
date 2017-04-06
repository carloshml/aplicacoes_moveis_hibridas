import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {

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
