import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DBResponse } from '../models/db-response';
import { Progress } from '../models/progress';

@Injectable()
export class ProgressService {

    private readonly GET_PROGRESS_URL = '/api/progress';
    private readonly POST_PROGRESS_URL = '/api/progress';

    private readonly POST_PURGE_URL = '/api/purge';
    private readonly POST_SPEND_URL = '/api/spend';

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

    public save(category: string, max_count: number, sort_order: number): Observable<DBResponse> {
        return this.http.post(this.POST_PROGRESS_URL, {
            category: category,
            max_count: max_count,
            sort_order: sort_order
        })
            .map((res: Response) => {
                let r: DBResponse = res.json();
                return r;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public update(id: number, category: string, max_count: number, sort_order: number): Observable<DBResponse> {
        return this.http.patch(this.POST_PROGRESS_URL + '/' + id, {
            id: id,
            category: category,
            max_count: max_count,
            sort_order: sort_order
        })
            .map((res: Response) => {
                let r: DBResponse = res.json();
                return r;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public delete(id: number): Observable<DBResponse> {
        return this.http.delete(this.POST_PROGRESS_URL + '/' + id, {
        })
            .map((res: Response) => {
                let r: DBResponse = res.json();
                return r;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public spend(progress_id: number, amount: number): Observable<DBResponse> {
        return this.http.post(this.POST_SPEND_URL, {
            progress_id: progress_id,
            amount: amount
        }).map((res: Response) => {
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
