import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DBResponse } from '../models/db-response';
import { User } from '../models/user';

@Injectable()
export class AuthService {

    readonly LOGIN_URL = '/api/login';

    private user: User;

    constructor(private http: Http) { }

    public authenticated(): boolean {
        return this.user != null;
    }

    public login(email: string, password: string):  Observable<DBResponse> {
        
        return this.http.post(this.LOGIN_URL, {
            email: email,
            password: password
        })
            .map((res: Response) => {
                let r: DBResponse = res.json();
                if (r.data != null) {
                    this.user = r.data as User;
                }
                return r;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        
    }

}
