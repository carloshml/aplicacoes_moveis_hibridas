import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
  key = '';
  myInput;
  info ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public auth: AuthService,
    public alertCtrl: AlertController,
  ) {


    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;
    this.key = this.info.key;

    this.amigos = af.database.list('/amigos');
    // para o place holder funcionar
    this.myInput='';

  }

  search(term:string){
    console.log(term);

    this.usuarios = this.af.database.list('/usuarios',{
      query: {
        orderByChild:'nome',
        startAt: term ,
      }

    });
    console.log(this.usuarios);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdiconarAmigo');
  }

  addAmigo(usuarioKey){

    this.amigos.push({
      keyUsuario: this.key,
      keyAmigo: usuarioKey,
      isNovo:true,
      quemFezAmizade: this.key,
    });
    let alert = this.alertCtrl.create({
      title: 'Pronto!',
      subTitle: 'Amigo Adicionado',
      buttons: ['OK']
    });
    alert.present();
  }

  onCancel(){
    this.usuarios = null;
  }

}
