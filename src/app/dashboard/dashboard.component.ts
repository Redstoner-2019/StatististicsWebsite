import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ThemeSelectorComponent } from "../theme-selector/theme-selector.component";
import { DashboardViewComponent } from '../dashboard-view/dashboard-view.component';
import { GameSelectorComponent } from '../game-selector/game-selector.component';
import { ChallengeSelectorComponent } from '../challenge-selector/challenge-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ThemeSelectorComponent, DashboardViewComponent, GameSelectorComponent, ChallengeSelectorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  tab = "dashboard";

  constructor(private app: AppComponent) {
    //app.update();
  }

  switchTab(tab: string){
    this.tab = tab;
  }

  changeTheme(theme: string){
    this.app.switchTheme(theme);
  }
}
