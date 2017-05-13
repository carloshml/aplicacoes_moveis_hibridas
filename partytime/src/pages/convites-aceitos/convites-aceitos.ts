import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { Usuario } from './usuario'

@IonicPage()
@Component({
  selector: 'page-convites-aceitos',
  templateUrl: 'convites-aceitos.html',
})
export class ConvitesAceitos {
  convites: FirebaseListObservable<any>;
  registerCredentials = {email: '',userid:'',nome:'', foto:'', key:''};
  idFesta:string;
  nome:string;
  amigo : Usuario = new Usuario();
  amigos: Array<Usuario> = new Array<Usuario>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af:AngularFire,
    private auth: AuthService,

  ) {

    this.idFesta = navParams.get('id');
    this.nome = navParams.get('nome');
    let info = this.auth.getUserInfo();
    this.registerCredentials.nome = info.name;
    this.registerCredentials.email = info.email;
    this.registerCredentials.userid = info.id;
    this.registerCredentials.key = info.key;

    this.convites = af.database.list('/convites',{
      query: {
        orderByChild: 'idfesta',
        equalTo: this.idFesta,
      }
    });

    this.convites.subscribe( convites=>{
      convites.map( convite =>{
        this.amigos = new Array<Usuario>();

        this.af.database.object('/usuarios/'+convite.convidado).subscribe(usuario => {
          this.amigo = new Usuario();
          this.amigo.isaceito = convite.isaceito;
          this.amigo.nome = usuario.nome;
          this.amigo.foto = usuario.foto;
          this.amigos.push(this.amigo);
        });

      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConvitesAceitos');
  }

}
