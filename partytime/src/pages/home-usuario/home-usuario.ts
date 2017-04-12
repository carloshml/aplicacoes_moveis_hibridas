import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TelaLogin} from '.././tela-login/tela-login'
import {Convidar} from '../convidar/convidar'
import {Festa} from '../festa/festa'
import { AuthService } from '../../providers/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
@IonicPage()
@Component({
  selector: 'page-home-usuario',
  templateUrl: 'home-usuario.html',
})



export class HomeUsuario {

  username = '';
  email = '';
  id='';
  foto = '';
  constructor(private navCtrl: NavController,
    private fb: Facebook,
    private auth: AuthService
  ) {
    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
    this.id = info.id ;
    this.foto = info.foto;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUsuario');
  }

  mostrarUsuario(){

    alert(' Usuario id ' + this.email +'  '+this.id  );
  }

  goToFesta() {

    this.navCtrl.push(Festa);
  }

  goToCriarFesta() {

    this.navCtrl.push('CriarFesta');
  }
  goToConvites() {

    this.navCtrl.push('Convites');
  }

  goToAmigos() {

    this.navCtrl.push('Amigos');
  }

  goToConvidar(){
    this.navCtrl.push(Convidar);
  }

  logout(){
    this.fb.logout();
    this.navCtrl.setRoot(TelaLogin);
  }


}
