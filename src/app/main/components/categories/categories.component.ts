import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { Progress } from '../../../models/progress';
import { NgForm } from '@angular/forms';

declare var swal;

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @ViewChild('mainForm') form: NgForm;

    public progressList: Array<Progress> = [];
    public selectedProgress: Progress;

    public submitted: boolean = false;

    constructor(private _progressService: ProgressService) { }

    ngOnInit() {
        this.getCategories();
    }

    private getCategories() {
        this.selectedProgress = null;
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
                    timer: 800,
                    showConfirmButton: false,
                }).then((result) => {
                    this.getCategories();
                });
            } else {
                
            }
        });
    }

    public add(): void {
        this.selectedProgress = new Progress();
        this.selectedProgress.max_count = 1;
    }

    public cancel(): void {
        this.getCategories();
    }

    public save(): void {

        this.submitted = true;

        if (this.form.valid) {
            this.getCategories();
            swal({
                title: 'Category Saved!',
                type: 'success',
                timer: 800,
                showConfirmButton: false,
            }).then((result) => {
            });
        }
        
    }

    public edit(progress: Progress): void {
        this.selectedProgress = progress;
    }

    public isFormInvalid(): boolean {
        return true;
    }

}
