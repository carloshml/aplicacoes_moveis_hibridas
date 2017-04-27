import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,     ActionSheetController  } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import {Convidar} from '../convidar/convidar'



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
    private auth: AuthService,
    public actionSheetCtrl: ActionSheetController

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

  showOptions(festaId, festaNome) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você quer fazer?',
      buttons: [
        {
          text: 'Apagar a festa',
          role: 'destructive',
          handler: () => {
            this.removeFesta(festaId);
          }
        },{
          text: 'Convidar Pessoas',
          handler: () => {
            this.navCtrl.push(Convidar, {
              id: festaId
            })
          }
        },{
          text: 'Atualizar o nome',
          handler: () => {
            this.updateFesta(festaId, festaNome);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  updateFesta(festaId, festaNome){
    let prompt = this.alertCtrl.create({
      title: 'Nome da festa',
      message: "Update o nome da festa para esse nome",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
          value: festaNome
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
            console.log(JSON.stringify(data));
            this.festas.update(festaId, {
              nome: data.nome
            });
          }
        }
      ]
    });
    prompt.present();
  }

  removeFesta(festaId: string){
    this.festas.remove(festaId);
  }

  addFesta(){
    let prompt = this.alertCtrl.create({
      title: 'Festa Name',
      message: "Coloque as informações da festa",
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
