import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { Observable } from 'rxjs/Observable';

/**
* Generated class for the Convites page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-convites',
  templateUrl: 'convites.html',
})
export class Convites {

  convites: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;
  festa: FirebaseListObservable<any>;
  nomeAmigos: Observable<any[]>;
  username = '';
  email = '';
  id='';

  constructor(
    public af: AngularFire,
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private alertCtrl : AlertController,

  ) {

    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
    this.id = info.id;

    this.convites = af.database.list('/convites',{
      query: {
        orderByChild: 'convidado',
        equalTo: this.id,
      }
    });

    /*
    criar um observable depois fazer um for each dentro depois criar um tipo que
    contenha todas as coisas e usar esse tipo pra mostrar na view
    */

  //  this.convites.forEach( snap => {  snap.idFesta = af.database.list('/festas/'+ snap.idFesta ); });




}

ionViewDidLoad() {
  console.log('ionViewDidLoad Convites');
  // alert(JSON.stringify(this.nomeAmigos) );
}


negarFesta(conviteId){
  this.convites.update(conviteId, {
    isaceito: false,
  });
  let alert = this.alertCtrl.create({
    title: 'Festa',
    subTitle: 'Você recusou o convite',
    buttons: ['OK']
  });
  alert.present();
}
aceitarFesta(conviteId){

  this.convites.update(conviteId, {
    isaceito: true,
  });
  let alert = this.alertCtrl.create({
    title: 'Festa',
    subTitle: 'Você aceitou',
    buttons: ['OK']
  });
  alert.present();

}

}
