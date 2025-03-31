import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TwofactorComponent } from './twofactor/twofactor.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { GameOverviewComponent } from './game-overview/game-overview.component';
import { StatsViewComponent } from './stats-view/stats-view.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '2fa', component: TwofactorComponent},
    {path: 'themes', component: ThemeSelectorComponent},
    {path: 'stats', component: StatsViewComponent},
    {path: 'games/:name', component: GameOverviewComponent },
    {path: 'games/:name/info', component: GameOverviewComponent },
    {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }