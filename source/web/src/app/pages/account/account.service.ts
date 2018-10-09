import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class AccountService {

  private token: String;
  public accountItem: any;
  public acction: String;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  getAllAccount(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_ACCOUNT, { token: this.token })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllPosition(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_POSITION, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addAccount(body): Observable<any> {
    return this.http.post(Config.API_ADD_ACCOUNT, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteAccount(code): Observable<any> {
    return this.http.post(Config.API_DELETE_ACCOUNT, { code: code })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateAccount(body): Observable<any> {
    return this.http.post(Config.API_UPDATE_ACCOUNT, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateStatusAuthor(body): Observable<any> {
    return this.http.post(Config.API_UPDATE_STATUS_AUTHOR_SMART_CONTRACTS, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addAuthor(body): Observable<any> {
    return this.http.post(Config.API_INSERT_AUTHOR_SMART_CONTRACTS, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
