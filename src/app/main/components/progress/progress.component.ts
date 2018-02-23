import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';
import { ProgressHistory } from '../../../models/progress_history';
import { DBResponse } from '../../../models/db-response';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

    public progressList: Array<Progress> = [];
    public progressHistoryList: Array<ProgressHistory> = [];

    public loading: boolean = false;

    constructor(private _progressService: ProgressService) { }

    ngOnInit() {
        this.getProgress();
        this.getProgressHistory();
    }

    private getProgress(): void {
        this._progressService.getProgress().subscribe(dbResponse => {
            this.progressList = dbResponse.data;
        });
    }

    private getProgressHistory(): void {
        this.loading = true;
        this._progressService.getProgressHistory().subscribe(dbResponse => {
            this.progressHistoryList = dbResponse.data.map((progressHistory) => {
                progressHistory.notes = this.uncapitalizeFirstLetter(progressHistory.notes);
                return progressHistory;
            });
            this.loading = false;
        });
    }
    
    private uncapitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

}
