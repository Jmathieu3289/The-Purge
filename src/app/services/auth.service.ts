import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DBResponse } from '../models/db-response';
import { User } from '../models/user';

@Injectable()
export class AuthService {

    readonly LOGIN_URL = '/api/login';
    readonly SESSION_URL = '/api/session';
    public authenticated: boolean = true;

    constructor(private http: Http) { 
        this.updateAuthentication();
    }

    private updateAuthentication() {
        this.http.get(this.SESSION_URL, {

        }).subscribe((res: Response) => {
            let r: DBResponse = res.json();
            this.authenticated = r.errors.length == 0;
        });
    }

    public login(email: string, password: string, rememberMe: boolean):  Observable<DBResponse> {
        
        return this.http.post(this.LOGIN_URL, {
            email: email,
            password: password
        })
            .map((res: Response) => {
                let r: DBResponse = res.json();
                if (r.data != null) {
                    let user: User = r.data as User;
                    if (rememberMe) {
                        localStorage.setItem('saved_email', user.email);
                    } else {
                        localStorage.removeItem('saved_email');
                    }
                    this.updateAuthentication();
                }
                return r;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        
    }

}
