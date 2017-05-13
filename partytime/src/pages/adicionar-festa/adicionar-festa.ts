import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-adicionar-festa',
  templateUrl: 'adicionar-festa.html',
})
export class AdicionarFesta {
  festas: FirebaseListObservable<any>;
   buget;
   data;
   nome;
   local;
   tema;
   dono;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af : AngularFire,
    private auth: AuthService,
        private alertCtrl: AlertController,
    ) {

      let info = this.auth.getUserInfo();
      this.dono = info.key;
    this.festas = af.database.list('/festas');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarFesta');
  }

  adicionarFesta(){

    this.festas.push({
      buget: this.buget,
      data:this.data,
      dono:this.dono,
      local: this.local,
      nome: this.nome,
      tema: this.tema,
    });
    let alert = this.alertCtrl.create({
      title: 'Parabéns',
      subTitle: 'Festa Criada',
      buttons: ['OK']
    });
    alert.present();
      this.navCtrl.pop();
  }



}
