import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
/**
* Generated class for the CriarNovaConta page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
  selector: 'page-criar-nova-conta',
  templateUrl: 'criar-nova-conta.html',
})
export class CriarNovaConta {
  registerCredentials={nome:"", email:"",senha:""};
  usuaruios:FirebaseListObservable<any>;
  loginTrue=0 ;



  constructor(public af: AngularFire,private nav: NavController, private alertCtrl: AlertController) {
    this.usuaruios = af.database.list('/usuarios');
  }

  addUsuario(){

 /*
    this.af.database.list('/usuarios', {
      query: {
        orderByChild: 'email',
        equalTo: this.registerCredentials.email,
      }
    }).subscribe(snapshot => {
      if(snapshot.length < 1) {
        this.usuaruios.push({
          nome: this.registerCredentials.nome,
          email: this.registerCredentials.email,
          senha: this.registerCredentials.senha,
        });
        this.nav.push(TelaLogin);
      }else {
        let alert = this.alertCtrl.create({
          title: 'Fail',
          subTitle: 'login já existente',
          buttons: ['OK']
        });
        alert.present(prompt);
      }

    }  );
    */

    this.usuaruios.push({
      nome: this.registerCredentials.nome,
      email: this.registerCredentials.email,
      senha: this.registerCredentials.senha,
    });

}


}
