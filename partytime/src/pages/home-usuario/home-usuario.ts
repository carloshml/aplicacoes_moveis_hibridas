import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TelaLogin} from '.././tela-login/tela-login'
import {Convidar} from '../convidar/convidar'
import {Festa} from '../festa/festa'
import {Amigos} from '../amigos/amigos'
import {Convites} from '../convites/convites'
import { AuthService } from '../../providers/auth.service';
import { Facebook } from '@ionic-native/facebook';
import {AngularFire, FirebaseListObservable,firebaseAuthConfig } from 'angularfire2';
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
  usuarios: FirebaseListObservable<any>;
   info ;
   usuarioExistente=0;


  constructor(
    private navCtrl: NavController,
    private fb: Facebook,
    private auth: AuthService,
    public af: AngularFire,
  ) {


    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;



    this.usuarios = this.af.database.list('/usuarios');


  }


  ionViewDidLoad() {

    this.af.database.list('/usuarios', {
    query: {
    orderByChild: 'id',
    equalTo: this.info.id ,
  }
}).subscribe(snapshot => { this.usuarioExistente = snapshot.length;
                            if(this.usuarioExistente){
                            //  alert('já existe');
                            }else{
                              this.usuarios.push({
                                nome: this.username,
                                id: this.id,
                                foto: this.foto,
                              });
                            }
});



    console.log('ionViewDidLoad HomeUsuario');
  }

  mostrarUsuario(){

    alert(' Usuario id ' + this.email +'  '+this.id  );
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
