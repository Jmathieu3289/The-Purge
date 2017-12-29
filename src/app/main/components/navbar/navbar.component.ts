import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public mobile = false;
    
    constructor(private _authService: AuthService, private _router: Router) { 
        this.mobile = window.screen.width <= 992;
    }

    ngOnInit() {
    }

    public onResize(event) {
        this.mobile = window.screen.width <= 992;
    }

    public isLogin() {
        return this._router.url === '/login';
    }

    public logout() {
        this._authService.logout().subscribe(r => {
            this._router.navigateByUrl('/login');
        });
    }

}
