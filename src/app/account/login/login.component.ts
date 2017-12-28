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
    public rememberMe: boolean;

    public loading: boolean = false;
    public hasErrors: boolean = false;

    constructor(private _authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.email = localStorage.getItem('saved_email'); //attempt to bring in a saved email address
        if (this.email != null && this.email != '') {
            this.rememberMe = true;
        }

        this.checkAuthentication(false);
    }

    public checkAuthentication(logAttempt: boolean): void {
        this._authService.authenticate().subscribe(authenticated => {
            this.loading = false;
            if (authenticated) {
                this.router.navigate(['./dashboard']);
            } else {
                if (logAttempt) {
                    this.hasErrors = true;
                    this.password = null; 
                }
            }
        });
    }

    public login(): void {

        this.hasErrors = false;

        //Check validation first
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this._authService.login(this.email, this.password, this.rememberMe).subscribe(res => {
            this.checkAuthentication(true);
        });

    }

}
