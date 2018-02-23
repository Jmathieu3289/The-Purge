import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DBResponse } from '../models/db-response';

@Injectable()
export class FriendService {

    private readonly GET_FRIENDS_URL = '/api/friends';

    constructor(private http: Http) {
    }

    public getFriends(): Observable<DBResponse> {
        return this.http.get(this.GET_FRIENDS_URL, {
        })
            .map((res: Response) => {
                const r: DBResponse = res.json();
                return r;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

}
