import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal;

@Component({
    selector: 'app-spend',
    templateUrl: './spend.component.html',
    styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {

    public submitted: boolean = false;
    public loading: boolean = false;

    public progressList: Array<Progress> = [];
    public selectedProgress: Progress;

    public amount: number = 1;

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

    public spend(): void {
        this.submitted = true;
        this._progressService.spend(this.selectedProgress.id, this.amount).subscribe(r => {
            let t: string = `Way to go! You've worked hard for this!`
            if (r.errors.length == 0) {
                swal({
                    title: 'Great work!',
                    text: t,
                    timer: 800,
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
        return this.selectedProgress.credits - this.amount;
    }

    public hasCreditsRemaining(): boolean {
        return this.selectedProgress.credits - this.amount > 0;
    }

}
