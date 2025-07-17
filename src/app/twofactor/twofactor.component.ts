import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-twofactor',
  standalone: true,
  imports: [ CommonModule , HttpClientModule],
  templateUrl: './twofactor.component.html',
  styleUrl: './twofactor.component.scss'
})
export class TwofactorComponent implements OnInit{
  params: any | null = {};

  isError = false;
  errorText = "";
  isDisabled = false;
  authenticateButtonText = "Authenticate";
  redirect = "";

  apiUrl = 'https://auth.redstonerdev.io/';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private app: AppComponent) {
    app.update();
  }

  authenticate(code: string){
    this.isDisabled = true;
    this.authenticateButtonText = "Authenticating..."

    let request;

    if(this.params.type === "login"){
      this.apiUrl = this.apiUrl + "loginConfirmation"
      request = {
        confirmId: this.params.id,
        code: code
    }
    }

    if(this.params.type === "signup"){
      this.apiUrl = this.apiUrl + "user/create"
      request = {
        type: "confirm",
        confirmationId: this.params.id,
        confirmationCode: code
    }
    }

    console.log(this.redirect.replace("%TOKEN%", "test"));

    this.http.post(this.apiUrl, request).subscribe((response) => {
      const result: any = response;
      switch (result.message) {
        case "code-expired": {
          this.isError = true;
          this.isDisabled = false;
          this.errorText = "This code has expired. Please retry to login/signup."
          break;
        }
        case "confirm-id-not-found": {
          this.isError = true;
          this.isDisabled = false;
          this.errorText = "This authentication does not exist anymore."
          break;
        }
        case "incorrect-confirmation-code": {
          this.isError = true;
          this.isDisabled = false;
          this.errorText = "This code is incorrect."
          break;
        }
        case "user-created": {
          console.log(result);
          localStorage.setItem('token', result.token);
          document.cookie = "token=" + result.token + "; domain=.redstonerdev.io; path=/";
          if(this.redirect == ""){
            this.router.navigate(["dashboard"]);
          }else {
            this.redirect = this.redirect.replace("%TOKEN%", result.token);
            window.location.href = this.redirect;
          }
          break;
        }
        case "success": {
          console.log(result);
          localStorage.setItem('token', result.token);
          document.cookie = "token=" + result.token + "; domain=.redstonerdev.io; path=/";
          if(this.redirect == ""){
            this.router.navigate(["dashboard"]);
          }else {
            this.redirect = this.redirect.replace("%TOKEN%", result.token);
            window.location.href = this.redirect;
          }
          break;
        }
        default: {
          this.isError = true;
          this.isDisabled = false;
          this.errorText = "An error has occured. " + result.message;
          break;
        }
      }
    },
    (error) => {
          this.isError = true;
          this.errorText = "An error has occured " + error;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      this.redirect= decodeURIComponent(params['redirect']);
    });
  }
}
