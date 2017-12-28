import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginScreenComponent } from './account/login-screen/login-screen.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './main/components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { NavbarComponent } from './main/components/navbar/navbar.component';
import { PurgeComponent } from './main/components/purge/purge.component';
import { ProgressService } from './services/progress.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginScreenComponent,
    DashboardComponent,
    SpinnerComponent,
    NavbarComponent,
    PurgeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthService, AuthGuard, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
