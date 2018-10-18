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
  public classroomId: number;

  constructor(private http: Http) {
    this.token = localStorage.getItem(Config.TOKEN_KEY);
  }

  addClassroom(body): Observable<any> {
    body.token = this.token;
    return this.http.post(Config.API_ADD_CLASS_ROOM, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  upadateClassroom(body): Observable<any> {
    body.token = this.token;
    body.status = Number(body.status);
    return this.http.post(Config.API_UPDATE_CLASS_ROOM, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteClassroom(id): Observable<any> {
    let body = {
      id: id,
      token: this.token,
      status: -1
    }
    return this.http.post(Config.API_DELETE_CLASS_ROOM, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllClassroom(): Observable<any> {
    return this.http.post(Config.API_GET_ALL_CLASS_ROOM, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getClassroomActive(): Observable<any> {
    return this.http.post(Config.API_GET_CLASS_ROOM_ACTIVE, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getStudentAvailable(): Observable<any> {
    return this.http.post(Config.API_GET_STUDENT_AVAILABLE, {})
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addStudyManager(body): Observable<any> {
    return this.http.post(Config.API_ADD_STUDY_MANAGER, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateStudyManager(body): Observable<any> {
    return this.http.post(Config.API_UPDATE_STUDY_MANAGER, body)
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getStudentOfClassroom(classroomId): Observable<any> {
    return this.http.post(Config.API_GET_STUDENT_OF_CLAS_ROOM, { classroomId: classroomId })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  destroyStudentOfClassroom(studentId, classroomId): Observable<any> {
    return this.http.post(Config.API_DESTROY_STUDENT_OF_CLASS_ROOM, { studentId: studentId, classroomId: classroomId })
      .map((res: Response) => {
        let json = res.json();
        return json;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
