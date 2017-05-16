import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-festa-detalhes',
  templateUrl: 'festa-detalhes.html',
})
export class FestaDetalhes {

  festa ={key:'',buget:'',data:'',dono:'',local:'',nome:'',tema:''};
  festas: FirebaseListObservable<any>;
  nome;
  buget;
  data;
  local;
  tema;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public alertCtrl: AlertController) {

      this.festa.key = navParams.get('id');

      this.af.database.object('/festas/'+this.festa.key).subscribe(snapshot => {
        this.festa.nome = snapshot.nome;
        this.festa.buget = snapshot.buget;
        this.festa.data = snapshot.data;
        this.festa.dono = snapshot.dono;
        this.festa.local = snapshot.local;
        this.festa.tema = snapshot.tema;
      });



      this.festa.key = navParams.get('id');
      this.festa.nome = navParams.get('nome');
      this.festa.dono= navParams.get('donoFesta');

      this.festas =  this.af.database.list('/festas/');



    }

    ionViewDidLoad() {
      this.nome =   this.festa.nome ;
      this.buget=   this.festa.buget ;
      this.data =   this.festa.data ;
      this.local =  this.festa.local ;
      this.tema = this.festa.tema ;
      console.log('ionViewDidLoad FestaDetalhes');
    }


    updadeFesta(){
      this.festas.update(this.festa.key,{
        nome:  this.nome ,
        dono:this.festa.dono,
        buget:  this.buget,
        data:  this.data ,
        local:  this.local ,
        tema:  this.tema,
      });

      let alert = this.alertCtrl.create({
        title: 'Atualizada',
        subTitle: 'Festa com Novos Dados',
        buttons: ['OK']
      });
      alert.present();

      this.navCtrl.pop();
    }

  }
