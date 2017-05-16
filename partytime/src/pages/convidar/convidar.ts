import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { Amizade } from '../amigos/./usuario'

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
  amigos: FirebaseListObservable<any>;
  convites: FirebaseListObservable<any>;
  amigo : Amizade = new Amizade();
  usuarios: Array<Amizade> = new Array<Amizade>();
  info;
  nomeItem;
  valorItem:string;
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




    this.amigos = this.af.database.list('/amigos',{
      query: {
        orderByChild: 'keyUsuario',
        equalTo: this.key,
      }
    });

    this.amigos.subscribe( amigos=>{
      amigos.map( amigo =>{
      this.usuarios = new Array<Amizade>();
        this.af.database.object('/usuarios/'+amigo.keyAmigo).subscribe(snapshot => {
          this.amigo = new Amizade();
          this.amigo.nome= snapshot.nome;
          this.amigo.foto = snapshot.foto;
          this.amigo.key = snapshot.$key;
          this.usuarios.push(this.amigo);
        });
      });
    });



  }

  convidarAmigo(usuarioId:string){

    // alert(this.nomeItem+ 'valor item \n'+this.valorItem+'id usuario\n'+  usuarioId + 'logado\n+ '+this.id);
    // objeto anom
    var a = {}
    a[this.idFesta] = true;

    if (this.valorItem.length>0){
      this.convites.push({
        convidante: this.key,
        convidado : usuarioId.toString() ,
        idfesta : this.idFesta,
        nomeItem: this.nomeItem,
        valorItem: this.valorItem,
        isaceito: false,
        isNovo: true,
      });
      let alert = this.alertCtrl.create({
        title: 'Festa',
        subTitle: 'convite enviado',
        buttons: ['OK']
      });
      alert.present();
    }else {
      let alerta = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Escreva um valor Numerico',
        buttons: ['OK']
      });
      alerta.present();
    }
  }




}
