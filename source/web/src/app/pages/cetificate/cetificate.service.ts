import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class CetificateService {

  private token: String;
  private infoAccount: any;
  public dataItem: any;
  public acction: String;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
    let dataAccount = localStorage.getItem(Config.OJBJECT_KEY);
    this.infoAccount = JSON.parse(dataAccount);
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


  // Cetificate List
  addCeticateList(body): Observable<any> {
    body.token = this.token;
    body.yearOfGraduation = Number(body.yearOfGraduation);
    return this.http.post(Config.API_INSERT_CETIFICATE_LIST, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllCeticateList(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_CETIFICATE_LIST, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteCeticateList(id): Observable<any> {
    let body = { token: this.token, id: id };
    return this.http.post(Config.API_DELETE_CETIFICATE_LIST, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateCeticateList(body): Observable<any> {
    body.token = this.token;
    return this.http.post(Config.API_UPDATE_CETIFICATE_LIST, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  // Smart contracts
  updateCeticateSmartContracts(body): Observable<any> {
    body.token = this.token;
    body.status = Number(body.status);
    return this.http.post(Config.API_UPDATE_CERTIFICATE_SMART_CONTRACTS, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addCeticateSmartContracts(body): Observable<any> {
    body.token = this.token;
    return this.http.post(Config.API_INSERT_CERTIFICATE_SMAERT_CONTRACTS, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getLogCeticateSmartContracts(): Observable<any> {
    return this.http.post(Config.API_GET_LOG_SMART_CONTRACTS, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getStudentActive(): Observable<any> {
    return this.http.post(Config.API_GET_STUDENT_ACTIVE, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
