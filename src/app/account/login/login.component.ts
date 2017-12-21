import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('mainForm') form: NgForm;

    public email: string;
    public password: string;

    public loading: boolean = false;
    public hasErrors: boolean = false;

    constructor(private _authService: AuthService,
                private router: Router) { }

    ngOnInit() {
    }

    public login(): void {

        this.hasErrors = false;

        //Check validation first
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this._authService.login(this.email, this.password).subscribe(res => {
            if (this._authService.authenticated()) {
                this.router.navigate(['./dashboard']);
            } else {
                this.hasErrors = true;
                this.password = null;
            }
            this.loading = false;
        });

    }

}
