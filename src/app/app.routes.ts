import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TwofactorComponent } from './twofactor/twofactor.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '2fa', component: TwofactorComponent},
    {path: 'themes', component: ThemeSelectorComponent},
    {path: '**', redirectTo: 'dashboard'},
];
