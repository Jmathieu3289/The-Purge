import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DBResponse } from '../models/db-response';

@Injectable()
export class ProgressService {

    private readonly GET_PROGRESS_URL = '/api/progress';
    private readonly POST_PURGE_URL = '/api/purge';

    constructor(private http: Http) {
    }

    public getProgress(): Observable<DBResponse> {
        return this.http.get(this.GET_PROGRESS_URL, {
        })
            .map((res: Response) => {
                let r: DBResponse = res.json();
                return r;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public purge(progress_id: number, amount: number): Observable<DBResponse> {
        return this.http.post(this.POST_PURGE_URL, {
            progress_id: progress_id,
            amount: amount
        }).map((res: Response) => {
            let r: DBResponse = res.json();
            return r;
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
