import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;
  id : string;
  foto: string;

  constructor(name: string, email: string,id:string , foto:string) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.foto = foto;
  }
}


@Injectable()
export class AuthService {
  currentUser: User;

  public login(credentials) {

        this.currentUser = new User(credentials.nome, credentials.email,credentials.userid ,credentials.foto );
    }

  public getUserInfo() : User {
    return this.currentUser;
  }

}
