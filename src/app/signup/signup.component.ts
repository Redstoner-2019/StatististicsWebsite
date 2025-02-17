import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

   constructor(private app: AppComponent) {
      app.update();
    }

  isDisabled = false;
  isError = false;
  signupButtonText = "Sign Up";
  errorText = "An error occured";

  signUp(username: string, displayname: string, email:string, password: string, confirmPassword: string){
    console.log(username + " - " + password);
    this.isDisabled = !this.isDisabled;
    this.signupButtonText = this.isDisabled ? 'Signing Up...' : 'Sign Up';

    this.isError = true;
    this.errorText = "An error occured";

    const packet = {
      username: username,
      displayname: displayname,
      email: email,
      password: password
    };

    console.log(packet);
  }
}
