import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DBResponse } from '../models/db-response';

@Injectable()
export class ProgressService {

    private readonly GET_PROGRESS_URL = '/api/progress';

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

}
