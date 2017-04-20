import { Component } from '@angular/core';
import { IonicPage,AlertController,Loading, NavController } from 'ionic-angular';
import { CriarNovaConta } from '../criar-nova-conta/criar-nova-conta';
import { HomeUsuario } from '../home-usuario/home-usuario';

import {AngularFire, FirebaseListObservable,firebaseAuthConfig } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-tela-login',
  templateUrl: 'tela-login.html'
})
export class TelaLogin {  loading: Loading;
  registerCredentials = {email: '',userid:'',nome:'', foto:''};
  FB_APP_ID: number = 1862402434040217;
  usuarios: FirebaseListObservable<any>;
  loginTrue=0 ;
  senhaTrue=0 ;

  constructor(
    public af: AngularFire,
    private fb: Facebook,
    private nav: NavController,
    private alertCtrl: AlertController,
    public auth: AuthService,
  ){
    this.usuarios = af.database.list('/usuarios');
    /*
    this.usuarios.subscribe(items => {
    // items is an array
    items.forEach(item => {
    console.log('nome:', item.$key, item.nome,item.email,item.senha);
  });
});
*/
}

public createAccount() {
  this.nav.push(CriarNovaConta);
}

fbLogin(): void {
  this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) =>  {

    this.fb.api("/me?fields=id,name,picture",[])
    .then( data => {
      // Create the user object

      //alert(JSON.stringify(data));
      this.registerCredentials.userid = data.id;
      this.registerCredentials.nome = data.name;

      this.registerCredentials.foto = data.picture.data.url;
      this.auth.login(this.registerCredentials);
      //alert( this.registerCredentials.foto  )
      this.goHomeUsuario();/*

      this.fb.api("me/picture?fields=url", []).then(foto => {
      alert(JSON.stringify(foto));
      this.registerCredentials.foto = foto.data ;
      this.auth.login(this.registerCredentials);
      alert( this.registerCredentials.foto  )
      this.goHomeUsuario();
    }, error => { alert(JSON.stringify(error));});

    fields=id,name,picture
    */

  }, error => { alert(JSON.stringify(error))
  })

}).catch(e => console.log('Error logging into Facebook', e));

}



public goHomeUsuario() {
  /*
  this.af.database.list('/usuarios', {
  query: {
  orderByChild: 'email',
  equalTo: this.registerCredentials.email,
}
}).subscribe(snapshot => { this.loginTrue = snapshot.length });

this.af.database.list('/usuarios', {
query: {
orderByChild: 'senha',
equalTo: this.registerCredentials.senha,
}
}).subscribe(snapshot => { this.senhaTrue = snapshot.length });
*/
this.nav.setRoot(HomeUsuario)
}
}
