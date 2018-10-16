import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class ClassroomService {

  private token: String;
  public dataItem: any;
  public acction: String;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  // addAuthor(body): Observable<any> {
  //   return this.http.post(Config.API_INSERT_AUTHOR_SMART_CONTRACTS, body)
  //     .map((res: Response) => {
  //       let json = res.json();
  //       return json;
  //     })
  //     .catch((error: any) => Observable.throw(error || 'Server error'));
  // }
}
