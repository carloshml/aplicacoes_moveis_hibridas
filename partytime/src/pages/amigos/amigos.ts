import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { Usuario } from './usuario'

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
  key='';
  amigos: FirebaseListObservable<any>;
  amigo : Usuario = new Usuario();
  usuarios: Array<Usuario> = new Array<Usuario>();
  info ;
  nomeAmigos;

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
    this.key= this.info.key;

    this.amigos = af.database.list('/amigos',{
      query: {
        orderByChild: 'keyUsuario',
        equalTo: this.key,
      }
    });

    this.amigos.subscribe( amigos=>{
      amigos.map( amigo =>{
        this.af.database.object('/usuarios/'+amigo.keyAmigo).subscribe(snapshot => {
          this.amigo = new Usuario();
          this.amigo.nome= snapshot.nome;
          this.amigo.foto = snapshot.foto;
          this.usuarios.push(this.amigo);
        });
      });
    });



    /*
    this.amigosUsuario = this.af.database.list('/amigos')
    .map(amigos => {
    amigos.map(p => {
    p.NomeDoamigo = this.af.database.object('/usuarios/'+p.$key);
  });
  return amigos;
});
this.amigos.forEach( data =>     this.usuarios = this.af.database.list('/usuarios',{
query: {
orderByChild:'id',
startAt: data.idUsuario ,
}
})
);
alert( JSON.stringify(this.usuarios));

*/
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad Amigos');

  }

  goToAdicionarAmigos() {
    // go to the MyPage component
    this.navCtrl.push('AdiconarAmigo');
  }

}
