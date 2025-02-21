import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

   constructor(private http: HttpClient, private router: Router, app: AppComponent) {
      app.update();
    }

  isDisabled = false;
  isError = false;
  signupButtonText = "Sign Up";
  errorText = "An error occured";

  apiUrl = 'http://158.220.105.209:8080/user/create';

  signUp(username: string, displayname: string, email:string, password: string, confirmPassword: string){
    console.log(username + " - " + password);
    this.isDisabled = !this.isDisabled;
    this.signupButtonText = this.isDisabled ? 'Signing Up...' : 'Sign Up';

    this.isError = true;
    this.errorText = "An error occured";

    const packet = {
      type: "creation",
      user: {
        username: username,
        displayName: displayname,
        email: email,
        password: password
      }
    };

    console.log("Signing up");
    console.log(packet);

    this.http.post(this.apiUrl, packet).subscribe(response => {
      const result: any = response;
      console.log(result);
      if(result.message != "account-in-confirmation"){
        switch(result.message) {
          default: {
            this.isError = true;
            this.errorText = result.message;
          }
        }

        this.isDisabled = false;
        this.signupButtonText = "Sign Up";
      } else {
        this.router.navigate(["/2fa"], { queryParams: { id: result["confirm-id"], type:"signup" } });
      }
    });

    console.log(packet);
  }
}
