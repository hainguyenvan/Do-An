import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Config } from '../../../config';

@Injectable()
export class AuthCustomService {

    public admin : any;

    constructor(private http: Http) {
    }

    login(email, password): Observable<any> {
        return this.http.post(Config.API_LOGIN, { email: email, password: password })
            .map((res: Response) => {
                let json = res.json();
                return json;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
