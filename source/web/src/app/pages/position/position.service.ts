import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class PositionService {

  private token: String;
  public positionItem: any;
  public acction: String;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  getAllPosition(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_POSITION, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addPosition(body): Observable<any> {
    return this.http.post(Config.API_INSERT_POSITION, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deletePosition(id): Observable<any> {
    return this.http.post(Config.API_DELETE_POSITION, { id: id })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updatePosition(body): Observable<any> {
    return this.http.post(Config.API_UPDATE_POSITION, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
