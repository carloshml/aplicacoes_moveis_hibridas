import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';

/**
 * Generated class for the Amigos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html',
})
export class Amigos {
  username = '';
  email = '';
  id='';
  foto = '';
  amigos: FirebaseListObservable<any>;
  usuarios: FirebaseListObservable<any>;
  info ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    public af: AngularFire,
  ) {


    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;

    this.amigos = af.database.list('/amigos',{
      query: {
        orderByChild: 'idUsuario',
        equalTo: this.id,
      }
    });

    this.amigos.forEach( data =>     this.usuarios = this.af.database.list('/usuarios',{
          query: {
            orderByChild:'id',
            startAt: data.idUsuario ,
          }
        })
      );
     alert( JSON.stringify(this.usuarios));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Amigos');
  }

  goToAdicionarAmigos() {
    // go to the MyPage component
    this.navCtrl.push('AdiconarAmigo');
  }

}
