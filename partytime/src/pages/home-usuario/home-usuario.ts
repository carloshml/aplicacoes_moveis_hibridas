import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import {TelaLogin} from '.././tela-login/tela-login'
import {Festa} from '../festa/festa'
import {Amigos} from '../amigos/amigos'
import {Convites} from '../convites/convites'
import { AuthService } from '../../providers/auth.service';
import { Facebook } from '@ionic-native/facebook';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import {ConviteRealizado} from '../convites/conviterealizado';
@IonicPage()
@Component({
  selector: 'page-home-usuario',
  templateUrl: 'home-usuario.html',
})

export class HomeUsuario {


  registerCredentials = {email: '',userid:'',nome:'', foto:'', key:''};
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;
  convites: FirebaseListObservable<any>;
  info ;
  usuarioExistente=0;
  conviteRealizado : ConviteRealizado = new ConviteRealizado();
  convitesRealizados: Array<ConviteRealizado> = new Array<ConviteRealizado>();



  constructor(
    private navCtrl: NavController,
    private fb: Facebook,
    private auth: AuthService,
    public af: AngularFire,
    public alertCtrl: AlertController,
  ) {

      this.getUser();



    this.usuarios = this.af.database.list('/usuarios');
    this.usuario =  this.af.database.list('/usuarios', {
      query: {
        orderByChild: 'id',
        equalTo: this.registerCredentials.userid ,
      }
    });


    this.usuario.forEach(next=>{
      this.registerCredentials.userid = next[0].id;
      this.registerCredentials.nome = next[0].nome;
      this.registerCredentials.foto = next[0].foto;
      this.registerCredentials.key = next[0].$key ;
            this.saberConvites();
      this.auth.login(this.registerCredentials);
    });
  }

  ionViewDidLoad() {

    this.af.database.list('/usuarios', {
      query: {
        orderByChild: 'id',
        equalTo: this.registerCredentials.userid ,
      }
    }).subscribe(snapshot => { this.usuarioExistente = snapshot.length;
      if(this.usuarioExistente){
        //  alert('já existe');
      }else{
        this.usuarios.push({
          nome: this.registerCredentials.nome,
          id: this.registerCredentials.userid,
          foto: this.registerCredentials.foto,
        });
      }
    });

    console.log('ionViewDidLoad HomeUsuario');
  }

  getUser(){

    this.info = this.auth.getUserInfo();
    this.registerCredentials.nome = this.info.name;
    this.registerCredentials.email = this.info.email;
    this.registerCredentials.userid = this.info.id ;
    this.registerCredentials.foto = this.info.foto;
    this.registerCredentials.key = this.info.key;
  }

  saberConvites(){
    this.convites = this.af.database.list('/convites',{
      query: {
        orderByChild: 'convidado',
        equalTo: this.registerCredentials.key,
      }
    });

    this.convites.subscribe( convites=>{
      convites.map( convite =>{
        this.convitesRealizados = new Array<ConviteRealizado>();
        this.af.database.object('/festas/'+convite.idfesta).subscribe(snapshot => {
          this.af.database.object('/usuarios/'+convite.convidante).subscribe(snapshot2 => {
            this.conviteRealizado = new ConviteRealizado();
            this.conviteRealizado.festa = snapshot.nome;
            this.conviteRealizado.data = snapshot.data;
            this.conviteRealizado.local = snapshot.local;
            this.conviteRealizado.convidante = snapshot2.nome;
            this.conviteRealizado.item = convite.nomeItem;
            this.conviteRealizado.isNovo = convite.isNovo;
            this.conviteRealizado.valorItem = convite.valorItem;
            this.conviteRealizado.idConvite = convite.$key;
            this.convitesRealizados.push(this.conviteRealizado);
          });
        });
      });
      return convites;
    });

    return this.convitesRealizados;
  }



  goToFesta() {

    this.navCtrl.push(Festa);
  }

  goToConvites() {

    this.navCtrl.push(Convites);
  }

  goToAmigos() {

    this.navCtrl.push(Amigos);
  }

  logout(){
    this.fb.logout();
    this.navCtrl.setRoot(TelaLogin);
  }

  negarFesta(conviteId){
    this.convites.update(conviteId, {
      isaceito: false,
      isNovo: false,
    });
    let alert = this.alertCtrl.create({
      title: 'Convite',
      subTitle: 'Você recusou o convite',
      buttons: ['OK']
    });
    alert.present();
  }
  aceitarFesta(conviteId){

    this.convites.update(conviteId, {
      isaceito: true,
      isNovo: false,
    });
    let alert = this.alertCtrl.create({
      title: 'Convite',
      subTitle: 'Você aceitou o convite',
      buttons: ['OK']
    });
    alert.present();

  }


}
