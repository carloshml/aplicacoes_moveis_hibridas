import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';

/**
* Generated class for the AdiconarAmigo page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-adiconar-amigo',
  templateUrl: 'adiconar-amigo.html',
})
export class AdiconarAmigo {
  usuarios: FirebaseListObservable<any>;
  amigos: FirebaseListObservable<any>;
  username = '';
  email = '';
  id='';
  foto = '';
  myInput;
  info ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public auth: AuthService,
  ) {


    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;

    this.amigos = af.database.list('/amigos',{
      query: {
        orderByChild: 'id',
        equalTo: this.id,
      }
    });
    // para o place holder funcionar
    this.myInput='';

  }

  search(term:string){
    console.log(term);

    this.usuarios = this.af.database.list('/usuarios',{
      query: {
        orderByChild:'nome',
        startAt: term ,
        limitToLast: 6,
      }

    });
    console.log(this.usuarios);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdiconarAmigo');
  }

  addAmigo(usuarioId){
    console.log('add' + usuarioId )

    this.amigos.push({
      idUsuario: this.id ,
      idAmigo: usuarioId


    });
  }

  onCancel(){
    this.usuarios = null;
  }

}
