import { Component, OnInit } from '@angular/core';
import { Progress } from '../../../models/progress';

import { ProgressService } from '../../../services/progress.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public progressList: Array<Progress> = [];

    public loading: boolean = false;

    constructor(private _progressService: ProgressService) { }

    ngOnInit() {
        this.getProgress();
    }

    public getProgress(): void {
        this.loading = true;
        this._progressService.getProgress().subscribe(r => {
            if (r.errors.length == 0) {
                this.progressList = r.data as Array<Progress>;
            }
            this.loading = false;
        });
    }
}
