import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TelaLogin} from '.././tela-login/tela-login'
import {Convidar} from '../convidar/convidar'
import {Festa} from '../festa/festa'
import {Amigos} from '../amigos/amigos'
import {Convites} from '../convites/convites'
import { AuthService } from '../../providers/auth.service';
import { Facebook } from '@ionic-native/facebook';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
@IonicPage()
@Component({
  selector: 'page-home-usuario',
  templateUrl: 'home-usuario.html',
})

export class HomeUsuario {


  registerCredentials = {email: '',userid:'',nome:'', foto:'', key:''};
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;
  info ;
  usuarioExistente=0;


  constructor(
    private navCtrl: NavController,
    private fb: Facebook,
    private auth: AuthService,
    public af: AngularFire,
  ) {

    this.info = this.auth.getUserInfo();
    this.registerCredentials.nome = this.info.name;
    this.registerCredentials.email = this.info.email;
    this.registerCredentials.userid = this.info.id ;
    this.registerCredentials.foto = this.info.foto;
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
      this.auth.login(this.registerCredentials);
    });

      this.usuarios =  this.af.database.list('/usuarios');

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

  mostrarUsuario(){


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

  goToConvidar(){
    this.navCtrl.push(Convidar);
  }

  logout(){
    this.fb.logout();
    this.navCtrl.setRoot(TelaLogin);
  }


}
