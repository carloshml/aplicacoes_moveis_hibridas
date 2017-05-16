import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { Amizade } from './usuario'

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
  novosAmigos: FirebaseListObservable<any>;
  amigosdoUsuario: FirebaseObjectObservable<any>;
  amigosdoUsuarioAux: FirebaseObjectObservable<any>;
  amigo : Amizade = new Amizade();
  usuarios: Array<Amizade> = new Array<Amizade>();
  info ;
  nomeAmigos;
  temAmigos=true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    public af: AngularFire,
    public novoAf: AngularFire,
    public alertCtrl: AlertController,
  ) {


    this.info = this.auth.getUserInfo();
    this.username = this.info.name;
    this.email = this.info.email;
    this.id = this.info.id ;
    this.foto = this.info.foto;
    this.key= this.info.key;

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
  this.amigos = this.af.database.list('/amigos');
  this.amigos.subscribe( amigos=>{
    if (amigos.length>0){
      this.temAmigos = true;
      amigos.map( amigo =>{
      this.usuarios= new Array<Amizade>();
       this.novoAf.database.object('/usuarios/'+amigo.keyAmigo).subscribe(snapshot => {
         this.novoAf.database.object('/usuarios/'+amigo.keyUsuario).subscribe(snapshot2 => {
            this.amigo = new Amizade();
            this.amigo.nome= snapshot.nome;
            this.amigo.foto = snapshot.foto;
            this.amigo.key = snapshot.$key;
            this.amigo.keyAmizade = amigo.$key;
            this.amigo.nome2= snapshot2.nome;
            this.amigo.foto2 = snapshot2.foto;
            this.amigo.key2 = snapshot2.$key;
            this.amigo.amizadeNova = amigo.isNovo;
            this.amigo.quemFezAmizade= amigo.quemFezAmizade;
            this.usuarios.push(this.amigo);
          });
        });
      });
    }else{
      this.temAmigos = false;
    }

  });
  console.log('ionViewDidLoad Amigos');
}


excluirAmizade(keyAmizade,nomeAmigo){
  this.amigos.remove(keyAmizade);
  /*
  .subscribe( amigo =>{
    amigo.map( amigo => {
    this.novosAmigos = this.af.database.list('/usuarios/'+keyAmizade+'/amigos');
    this.novosAmigos.remove(amigo.$key);
    })
});
  */

  let alert = this.alertCtrl.create({
    title: ' Amizade acabou',
    subTitle: 'Você exclui '+nomeAmigo,
    buttons: ['OK']
  });
  alert.present();

}

aceitarAmizade(keyAmizade,nomeAmigo){
  this.amigos.update(keyAmizade,{
    isNovo:false,
  });
  let alert = this.alertCtrl.create({
    title: ' Amizade Começou',
    subTitle: 'Parabéns'  ,
    buttons: ['OK']
  });
  alert.present();

}

goToAdicionarAmigos() {
  // go to the MyPage component
  this.navCtrl.push('AdiconarAmigo');
}

}
