import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal;

@Component({
  selector: 'app-purge',
  templateUrl: './purge.component.html',
  styleUrls: ['./purge.component.css']
})
export class PurgeComponent implements OnInit {

    public submitted: boolean = false;
    public loading: boolean = false;

    public progressList: Array<Progress> = [];
    public selectedProgress: Progress;

    public amount: number = 1;

    public addingDetails: boolean = false;
    public notes: string;

    constructor(private _progressService: ProgressService, private _router: Router, private _route: ActivatedRoute) { }

    ngOnInit() {
        this.getCategories();
    }

    private getCategories(): void {
        this._progressService.getProgress().subscribe(r => {
            if (r.errors.length == 0) {
                this.progressList = r.data.sort((a: Progress, b: Progress) => {
                    return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;
                }) as Array<Progress>;
                this.processRouteParams();
            }
        });
    }

    private processRouteParams(): void {
        this._route.params.subscribe(params => {
            if (params['progress_id']) {
                this.selectedProgress = this.findProgressByID(params['progress_id']);
            }
        });
    }

    private findProgressByID(id: number): Progress {
        return this.progressList.find((progress) => {
            return progress.id == id;
        });
    }
  
    public purge(): void {
        this.submitted = true;
        this._progressService.purge(this.selectedProgress.id, this.amount, this.notes).subscribe(r => {
            let t: string = this.newBalance() > this.selectedProgress.credits ?
                'You earned ' + (this.newBalance() - this.selectedProgress.credits) + ' credit' +
                    ((this.newBalance() - this.selectedProgress.credits) == 1 ? '' : 's') +
                    '! Don\'t you feel better?' : 'Keep it up! You\'re getting there!';
            if (r.errors.length == 0) {
                swal({
                    title: 'Great work!',
                    text: t,
                    timer: 1000,
                    type: 'success',
                    showConfirmButton: false,
                    allowOutsideClick: false
                }).then((result) => {
                    this._router.navigateByUrl('/dashboard');
                });
            }
        });
    }  

    public newBalance(): number {
        return this.selectedProgress.credits + Math.floor((this.selectedProgress.current_count + this.amount) / this.selectedProgress.max_count);
    }

    public getNewProgressPercent(): number {
        return ((this.amount) / this.selectedProgress.max_count) * 100;
    } 

    public getCurrentProgressPercent(): number {
        return ((this.selectedProgress.current_count) / this.selectedProgress.max_count) * 100;
    } 

    public addDetails(): void {
        this.addingDetails = true;
    }

}
