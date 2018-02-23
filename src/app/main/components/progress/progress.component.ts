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
                if (progressHistory.notes != null && progressHistory.notes != '') {
                    progressHistory.notes = this.uncapitalizeFirstLetter(progressHistory.notes);
                } else {
                    progressHistory.notes = progressHistory.amount + ' item from ' + this.getCategoryName(progressHistory.progress_id) + '.';
                }
                return progressHistory;
            });
            this.loading = false;
        });
    }
    
    private uncapitalizeFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    private getCategoryName(progressID: number): string {
        
        let progress = this.progressList.find((progress) => {
            return progress.id == progressID;
        });

        return progress ? this.uncapitalizeFirstLetter(progress.category) : 'something';
    }

}
