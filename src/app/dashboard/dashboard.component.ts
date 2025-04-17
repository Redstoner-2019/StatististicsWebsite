import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ThemeSelectorComponent } from "../theme-selector/theme-selector.component";
import { DashboardViewComponent } from '../dashboard-view/dashboard-view.component';
import { GameSelectorComponent } from '../game-selector/game-selector.component';
import { ChallengeSelectorComponent } from '../challenge-selector/challenge-selector.component';
import { CommonModule } from '@angular/common';
import { DeveloperComponent } from "../developer/developer.component";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ThemeSelectorComponent, DashboardViewComponent, GameSelectorComponent, ChallengeSelectorComponent, DeveloperComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tab = "";

  constructor(private app: AppComponent, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if(params["tab"] != undefined){
        this.tab = params["tab"];
      } else {
        this.tab = "dashboard";
      }
    });
  }

  switchTab(tab: string){
    this.tab = tab;

    this.router.navigate(["/dashboard"], { queryParams: { tab: tab } });
  }

  changeTheme(theme: string){
    this.app.switchTheme(theme);
  }
}
