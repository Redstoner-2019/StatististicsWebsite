import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  redirect = "";

   constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, app: AppComponent) {
      app.update();
      this.route.queryParams.subscribe(params => {
        this.redirect = params['redirect'];
        //const redirectUrl = encodeURIComponent(this.redirect);
        //this.router.navigate(["/2fa"], { queryParams: { id: "test", type:"signup", redirect: redirectUrl } });
      });
    }

  isDisabled = false;
  isError = false;
  signupButtonText = "Sign Up";
  errorText = "An error occured";

  apiUrl = 'https://auth.redstonerdev.io/user/create';

  signUp(username: string, displayname: string, email:string, password: string, confirmPassword: string){
          //console.log(this.redirect)
          //const redirectUrl = encodeURIComponent(this.redirect);
          //console.log(redirectUrl)
          //this.router.navigate(["/2fa"], { queryParams: { id: "test", type:"signup", redirect: redirectUrl } });

    //if(true) return;

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
        if(this.redirect == ""){
          this.router.navigate(["/2fa"], { queryParams: { id: result["confirm-id"], type:"signup" } });
        } else {
          console.log(this.redirect)
          const redirectUrl = encodeURIComponent(this.redirect);
          console.log(redirectUrl)
          this.router.navigate(["/2fa"], { queryParams: { id: result["confirm-id"], type:"signup", redirect: redirectUrl } });
        }
      }
    });

    console.log(packet);
  }
}
