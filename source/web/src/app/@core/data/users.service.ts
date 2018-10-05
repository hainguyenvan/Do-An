
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Config } from '../../config';

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];
  private token: String;
  private

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  getUsers(): Observable<any> {
    return this.http.post(Config.API_GET_INFO_ACCOUNT, { token: this.token })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }
}
