import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';

/**
* Generated class for the Convidar page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-convidar',
  templateUrl: 'convidar.html',
})
export class Convidar {
  username = '';
  email = '';
  id='';
  foto = '';
  usuarios: FirebaseListObservable<any>;
  convites: FirebaseListObservable<any>;
  info;
  nomeItem;
  valorItem;
  myInput;
  idFesta;

  constructor(public navCtrl: NavController, public navParams: NavParams ,   public af: AngularFire,
    public auth: AuthService,
  ) {

    this.idFesta = navParams.get('id');
    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;
    this.convites = af.database.list('/convites');
    // para o place holder funcionar
    this.myInput='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Convidar');
  }

  goAnterior() {
    // go to the MyPage component
    this.navCtrl.pop();
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

  convidarAmigo(usuarioId){

// alert(this.nomeItem+ 'valor item \n'+this.valorItem+'id usuario\n'+  usuarioId + 'logado\n+ '+this.id);
    this.convites.push({
      condidante: this.id,
      condado : usuarioId,
      idfesta :this.idFesta,
      nomeItem: this.nomeItem,
      valorItem: this.valorItem,
    });

  }

}
