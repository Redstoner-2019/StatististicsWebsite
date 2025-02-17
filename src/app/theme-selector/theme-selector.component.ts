import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent {
  constructor(private app: AppComponent) {
    this.app.changeThemeButtonText = "Back";
  }

  changeTheme(theme: string){
    this.app.switchTheme(theme);
  }
}
