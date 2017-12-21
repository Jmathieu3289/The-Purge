import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild(NgForm) form: NgForm;

    constructor() { }

    ngOnInit() {
    }

    public login(): void {

        //Check validation first
        if (this.form.invalid) {
            return;
        }

        console.log('Valid form!');

    }

}
