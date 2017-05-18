import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import {ConviteRealizado} from './conviterealizado';

@IonicPage()
@Component({
  selector: 'page-convites',
  templateUrl: 'convites.html',
})

export class Convites {

  convites: FirebaseListObservable<any>;
  username = '';
  email = '';
  id='';
  key='';
  conviteRealizado : ConviteRealizado = new ConviteRealizado();
  convitesRealizados: Array<ConviteRealizado> = new Array<ConviteRealizado>();
  constructor(
    public af: AngularFire,
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private alertCtrl : AlertController,

  ) {

    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
    this.id = info.id;
    this.key = info.key;

    this.saberConvites();


    // = af.database.list('/festas/'+convite.idfesta)
    // var festa; loop over convites this.convites.subscribe( );
    /*
    criar um observable depois fazer um for each dentro depois criar um tipo que
    contenha todas as coisas e usar esse tipo pra mostrar na view
    */

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Convites');
  }


  saberConvites(){
    this.convites = this.af.database.list('/convites',{
      query: {
        orderByChild: 'convidado',
        equalTo: this.key,
      }
    });

    this.convites.subscribe( convites=>{
      convites.map( convite =>{
        this.convitesRealizados = new Array<ConviteRealizado>();
        this.af.database.object('/festas/'+convite.idfesta).subscribe(snapshot => {
          this.af.database.object('/usuarios/'+convite.convidante).subscribe(snapshot2 => {
            this.conviteRealizado = new ConviteRealizado();
            this.conviteRealizado.festa = snapshot.nome;
            this.conviteRealizado.data = snapshot.data;
            this.conviteRealizado.local = snapshot.local;
            this.conviteRealizado.convidante = snapshot2.nome;
            this.conviteRealizado.item = convite.nomeItem;
            this.conviteRealizado.valorItem = convite.valorItem;
            this.conviteRealizado.idConvite = convite.$key;
            this.convitesRealizados.push(this.conviteRealizado);
          });
        });
      });
      return convites;
    });

    return this.convitesRealizados;
  }


  negarFesta(conviteId){
    this.convites.update(conviteId, {
      isaceito: false,
    });
    let alert = this.alertCtrl.create({
      title: 'Convite',
      subTitle: 'Você recusou o convite',
      buttons: ['OK']
    });
    alert.present();
  }
  aceitarFesta(conviteId){

    this.convites.update(conviteId, {
      isaceito: true,
    });
    let alert = this.alertCtrl.create({
      title: 'Convite',
      subTitle: 'Você aceitou o convite',
      buttons: ['OK']
    });
    alert.present();

  }

  dataConvite( data:string){
    var a : Array<string>  ;
    a=data.split('-');
    return a[2]+'/'+a[1]+'/'+a[0];

  }

}
