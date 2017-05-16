import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,     ActionSheetController  } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import {Convidar} from '../convidar/convidar'
import {ConvitesAceitos} from '../convites-aceitos/convites-aceitos'
import { AdicionarFesta } from '../adicionar-festa/adicionar-festa';
import { FestaDetalhes } from '../festa-detalhes/festa-detalhes';


@IonicPage()
@Component({
  selector: 'page-festa',
  templateUrl: 'festa.html',
})
export class Festa {
  festas: FirebaseListObservable<any>;
  convites : FirebaseListObservable<any>;
  key = '';
  username = '';
  email = '';
  id='';
  temFesta:boolean = true;


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
    this.key= info.key;


    this.festas = af.database.list('/festas',{
      query: {
        orderByChild: 'dono',
        equalTo: this.key,
      }
    });
    this.festas.subscribe( festas => {
          if (festas.length>0){
            this.temFesta = true;
          }else{
            this.temFesta = false;
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
          text: 'Ver Convites Aceitos',
          handler: () => {
            this.navCtrl.push(ConvitesAceitos, {
              id: festaId,
              nome:festaNome
            })
          }
        },{
          text: 'Atualizar Dados da Festa',
          handler: () => {
            this.navCtrl.push(FestaDetalhes, {
              id: festaId,
              nome:festaNome,
              donoFesta: this.key,
            })
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

  irConvitesAceitos(){

    this.navCtrl.push(ConvitesAceitos);
  }

  removeFesta(festaId: string){


    this.convites = this.af.database.list('/convites',{
      query: {
        orderByChild: 'idfesta',
        equalTo: festaId,
      }
    });
    this.festas.remove(festaId);
    this.convites.subscribe( convites=>{
      convites.map(convite =>{
        this.convites.remove(convite.$key);
      });
    });
  }

  addFesta(){
    this.navCtrl.push(AdicionarFesta);
  }
}
