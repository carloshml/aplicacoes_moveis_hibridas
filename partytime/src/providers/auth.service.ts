import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;
  id : string;
  foto: string;
  key: string;

  constructor(name: string, email: string,id:string , foto:string, key:string) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.foto = foto;
    this.key = key;
  }
}


@Injectable()
export class AuthService {
  currentUser: User;

  public login(credentials) {

        this.currentUser = new User(credentials.nome, credentials.email,credentials.userid ,credentials.foto,credentials.key );
    }

  public getUserInfo() : User {
    return this.currentUser;
  }

}
