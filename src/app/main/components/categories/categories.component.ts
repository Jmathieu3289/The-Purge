import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';

declare var swal;

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    public progressList: Array<Progress> = [];
    public selectedProgress: Progress;

    constructor(private _progressService: ProgressService) { }

    ngOnInit() {
        this.getCategories();
    }

    private getCategories() {
        this._progressService.getProgress().subscribe(dbResponse => {
            this.progressList = dbResponse.data;
        });
    }

    public delete(progress: Progress) {
        swal({
            title: 'Are you sure?',
            text: 'You will lose all of your progress in this category.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal({
                    title: 'All Gone!',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                }).then((result) => {
                    this.getCategories();
                });
            } else {
                
            }
        });
    }

    public edit(progress: Progress) {
        this.selectedProgress = progress;
    }

}
