import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public mobile = false;
    
    constructor(private _authService: AuthService) { 
        this.mobile = window.screen.width <= 992;
    }

    ngOnInit() {
    }

    public onResize(event) {
        this.mobile = window.screen.width <= 992;
    }

}
