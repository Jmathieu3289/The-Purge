import { Component, OnInit } from '@angular/core';

//Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

    constructor(private _authService: AuthService) { 
      
  }

  ngOnInit() {
  }

}
