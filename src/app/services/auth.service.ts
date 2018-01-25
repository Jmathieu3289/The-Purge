import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DBResponse } from '../models/db-response';
import { User } from '../models/user';

@Injectable()
export class AuthService {

    private readonly LOGIN_URL = '/api/login';
    private readonly LOGOUT_URL = '/api/logout';
    private readonly SESSION_URL = '/api/session';

    constructor(private http: Http) {
    }

    public authenticate(): Observable<boolean> {
        return this.http.get(this.SESSION_URL, {
        })
        .map((res: Response) => {
            let r: DBResponse = res.json();
            return r.errors.length == 0;
        });
    }

    public login(email: string, password: string, rememberMe: boolean):  Observable<DBResponse> {

        return this.http.post(this.LOGIN_URL, {
            email: email,
            password: password
        })
        .map((res: Response) => {
            const r: DBResponse = res.json();
            if (r.data != null) {
                const user: User = r.data as User;
                if (rememberMe) {
                    localStorage.setItem('saved_email', user.email);
                } else {
                    localStorage.removeItem('saved_email');
                }
            }
            return r;
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public logout(): Observable<DBResponse> {
        return this.http.post(this.LOGOUT_URL, {
        })
        .map((res: Response) => {
            const r: DBResponse = res.json();
            return r;
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

}
