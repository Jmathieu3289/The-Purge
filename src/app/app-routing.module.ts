import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './account/login-screen/login-screen.component';
import { DashboardComponent } from './main/components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { PurgeComponent } from './main/components/purge/purge.component';
import { SpendComponent } from './main/components/spend/spend.component';
import { CategoriesComponent } from './main/components/categories/categories.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'purge',
        component: PurgeComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'spend',
        component: SpendComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [
            AuthGuard
        ]
    },
    { path: 'login', component: LoginScreenComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
