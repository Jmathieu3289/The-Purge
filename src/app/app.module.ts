import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DndModule } from 'ng2-dnd';

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
import { SpendComponent } from './main/components/spend/spend.component';
import { CategoriesComponent } from './main/components/categories/categories.component';
import { ProgressComponent } from './main/components/progress/progress.component';
import { ProfileComponent } from './main/components/profile/profile.component';
import { FriendsComponent } from './main/components/friends/friends.component';
import { LoadingListComponent } from './shared/components/loading-list/loading-list.component';
import { FriendService } from './services/friend.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginScreenComponent,
    DashboardComponent,
    SpinnerComponent,
    NavbarComponent,
    PurgeComponent,
    SpendComponent,
    CategoriesComponent,
    ProgressComponent,
    ProfileComponent,
    FriendsComponent,
    LoadingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    DndModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, ProgressService, FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
