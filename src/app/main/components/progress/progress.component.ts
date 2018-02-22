import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';
import { ProgressHistory } from '../../../models/progress_history';
import { DBResponse } from '../../../models/db-response';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

    public progressList: Array<Progress> = [];
    public progressHistoryList: Array<ProgressHistory> = [];

    constructor(private _progressService: ProgressService) { }

    ngOnInit() {
        this.getProgress();
        this.getProgressHistory();
    }

    public getProgress(): void {
        this._progressService.getProgress().subscribe(dbResponse => {
            this.progressList = dbResponse.data;
        });
    }

    public getProgressHistory(): void {
        this._progressService.getProgressHistory(1).subscribe(dbResponse => {
            this.progressHistoryList = dbResponse.data;
        });
    }

}
