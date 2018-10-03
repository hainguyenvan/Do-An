import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class CetificateService {

  private token: String;
  public dataItem: any;
  public acction: String;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  getAllCeticateCategory(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_CETIFICATE_CATEGORY, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addCeticateCategory(body): Observable<any> {
    return this.http.post(Config.API_INSERT_CETIFICATE_CATEGORY, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteCeticateCategory(id): Observable<any> {
    return this.http.post(Config.API_DELETE_CETIFICATE_CATEGORY, { id: id })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateCeticateCategory(body): Observable<any> {
    return this.http.post(Config.API_UPDATE_CETIFICATE_CATEGORY, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
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
}
