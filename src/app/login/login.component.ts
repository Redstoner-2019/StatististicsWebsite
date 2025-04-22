import { Component, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isDisabled = false;
  isError = false;
  loginButtonText = "Login";
  errorText = "An error occured";
  apiUrl = 'https://auth.redstonerdev.io/login';

  constructor(private http: HttpClient, private router: Router, app: AppComponent, private api: ApiService) {
    app.update();
  }

  login(username: string, password: string){
    console.log(username + " - " + password);
    this.isDisabled = true;
    this.loginButtonText = 'Logging in...';

    const packet = {
      username: username,
      password: password
    };

    this.http.post(this.apiUrl, packet).subscribe((response) => {
      const result: any = response;
      console.log(result);
      if(result.message != "success"){
        switch(result.message) {
          case "user-not-found": {
            this.isError = true;
            this.errorText = "This user does not exist.";
            break;
          }
          case "incorrect-password": {
            this.isError = true;
            this.errorText = "Incorrect Password.";
            break;
          }
          case "authenticate": {
            this.router.navigate(["/2fa"], { queryParams: { id: result["auth-id"], type:"login" } });
            break;
          }
          default: {
            this.isError = true;
            this.errorText = result.message;
          }
        }

        this.isDisabled = false;
        this.loginButtonText = 'Login';
      } else {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', username);

        this.router.navigate(["/dashboard"], { queryParams: { category: 'electronics' } });
      }
    });
  }
}
