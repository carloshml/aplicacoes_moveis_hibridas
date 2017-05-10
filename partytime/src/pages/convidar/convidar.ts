import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  key ='';
  usuarios: FirebaseListObservable<any>;
  convites: FirebaseListObservable<any>;
  info;
  nomeItem;
  valorItem;
  myInput;
  idFesta;

  constructor(public navCtrl: NavController, public navParams: NavParams ,   public af: AngularFire,
    public auth: AuthService,
    private alertCtrl: AlertController,
  ) {

    this.idFesta = navParams.get('id');
    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;
    this.key = this.info.key;
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

  convidarAmigo(usuarioId:string){

// alert(this.nomeItem+ 'valor item \n'+this.valorItem+'id usuario\n'+  usuarioId + 'logado\n+ '+this.id);
// objeto anom
  var a = {}
  a[this.idFesta] = true;

  var idFest = this.idFesta;
    this.convites.push({
      convidante: this.key,
      convidado : usuarioId.toString() ,
      idfesta : idFest,
      nomeItem: this.nomeItem,
      valorItem: this.valorItem,
      isaceito: false,
    });




    let alert = this.alertCtrl.create({
    title: 'Festa',
    subTitle: 'convite enviado',
    buttons: ['OK']
  });
  alert.present();

  }

}
