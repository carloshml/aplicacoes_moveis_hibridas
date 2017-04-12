import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';



/**
* Generated class for the Festa page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-festa',
  templateUrl: 'festa.html',
})
export class Festa {
  festas: FirebaseListObservable<any>;
  selectedFesta;
  username = '';
  email = '';
  id='';


  constructor( public alertCtrl:AlertController,
    public af: AngularFire,
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService
  ) {
    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
    this.id = info.id;
    this.festas = af.database.list('/festas',{
      query: {
        orderByChild: 'dono',
        equalTo: this.id,
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Festa');
  }

  goToFestaDetalhes(festa) {

    //this.selectedFesta = festa;
    this.navCtrl.push('FestaDetalhes');
  }

  addFesta(){
    let prompt = this.alertCtrl.create({
      title: 'Festa Name',
      message: "Enter a name for this new festa you're so keen on adding",
      inputs: [
        {
          name: 'nome',
          placeholder: 'nome'
        },
        {
          name: 'data',
          placeholder: 'data'
        },
        {
          name: 'local',
          placeholder: 'local'
        },
        {
          name: 'tema',
          placeholder: 'tema'
        },
        {
          name: 'dono',
          placeholder: 'dono'
        },
        {
          name: 'buget',
          placeholder: 'valor'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.festas.push({
              nome: data.nome,
              data: data.data,
              local: data.local,
              tema: data.tema,
              dono: this.id,
              nomeDoDonoDaFesta:this.username,
              buget: data.buget
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
