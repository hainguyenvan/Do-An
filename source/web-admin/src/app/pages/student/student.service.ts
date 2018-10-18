import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class StudentService {

  private token: String;
  public dataItem: any;
  public acction: String;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  addStudent(body): Observable<any> {
    body.token = this.token;
    return this.http.post(Config.API_ADD_STUDENT, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateStudent(body): Observable<any> {
    body.token = this.token;
    return this.http.post(Config.API_UPDATE_STUDENT, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllStudents(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_STUDENTS, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteStudent(id): Observable<any> {
    let body = {
      id: id,
      status: -1,
      token: this.token
    }
    return this.http.post(Config.API_DELETE_STUDENTS, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
