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
                this._progressService.delete(progress.id).subscribe(response => {
                    if (response.data > 0) {
                        swal({
                            title: 'All Gone!',
                            type: 'success',
                            timer: 1000,
                            showConfirmButton: false,
                        }).then((result) => {
                            this.getCategories();
                        });
                    }
                });
            } else {
                
            }
        });
    }

    public add(): void {
        this.selectedProgress = new Progress();
        this.selectedProgress.max_count = 1;
        this.selectedProgress.sort_order = this.progressList[this.progressList.length - 1].sort_order + 1;
    }

    public cancel(): void {
        this.getCategories();
    }

    public save(): void {

        this.submitted = true;

        if (this.form.valid) {

            if (this.selectedProgress.id == null) {
                this.saveNewProgress();
            } else {
                this.updateProgress();
            }
        }       
    }

    private saveNewProgress(): void {
        this._progressService.save(this.selectedProgress.category, this.selectedProgress.max_count, this.selectedProgress.sort_order).subscribe(response => {
            if (response.errors.length == 0) {
                swal({
                    title: 'Category Saved!',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                }).then((result) => {
                    this.submitted = false;
                    this.getCategories();
                });
            } else {
                swal({
                    title: 'Error Saving Category!',
                    type: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                }).then((result) => {
                    this.submitted = false;
                    this.getCategories();
                });
            }
        });
    }

    private updateProgress(): void {
        this.persistUpdate();      
    }

    private persistUpdate(): void {
        this._progressService.update(this.selectedProgress.id, this.selectedProgress.category, this.selectedProgress.max_count, this.selectedProgress.sort_order).subscribe(response => {
            if (response.errors.length == 0) {
                swal({
                    title: 'Category Updated!',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                }).then((result) => {
                    this.submitted = false;
                    this.getCategories();
                });
            } else {
                swal({
                    title: 'Error Updating Category!',
                    type: 'error',
                    timer: 100,
                    showConfirmButton: false,
                }).then((result) => {
                    this.submitted = false;
                    this.getCategories();
                });
            }
        });
    }

    public edit(progress: Progress): void {
        this.selectedProgress = progress;
    }

    public isFormInvalid(): boolean {
        return true;
    }

    public increment(): void {
        this.selectedProgress.max_count += 1;
    }

    public decrement(): void {
        this.selectedProgress.max_count -= 1;
        this.validateMaxCount();
    }

    public validateMaxCount(): void {
        this.selectedProgress.max_count = Math.max(1, this.selectedProgress.max_count);
    }

    public updateOrder(): void {
        for (let i = 0; i < this.progressList.length; i++){
            let progress = this.progressList[i];
            progress.sort_order = i;
            this._progressService.update(progress.id, progress.category, progress.max_count, progress.sort_order).subscribe(response => {
            });
        }
    }

}
