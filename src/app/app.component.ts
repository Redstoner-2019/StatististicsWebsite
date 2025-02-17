import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  params: any | null = {};
  changeThemeButtonText = "Change Theme";

  constructor(private themeService: ThemeService, private route: ActivatedRoute, private router: Router) {

  }

  changeThemeButton(){
    if(this.router.url.startsWith("/themes")){
      this.changeThemeButtonText = "Change Theme";
      console.log("Redirecting to " + this.params.redirect);
      this.router.navigate([this.params.redirect], { queryParams: JSON.parse(this.params.params) });
    } else {
      this.changeThemeButtonText = "Back";
      this.router.navigate(["/themes"], { queryParams: { redirect: this.router.url, params: JSON.stringify(this.params) } });
    }
    console.log(this.router.url);
  }

  update(){
    let theme = localStorage.getItem("theme");
    if(theme == null) theme = "lofi";
    this.switchTheme(theme);
  }

  switchTheme(theme:string){
    this.themeService.setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  title = 'StatWebsite';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      console.log(this.params);
    });
  }
}
