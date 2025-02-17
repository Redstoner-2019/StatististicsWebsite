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

  apiUrl = 'http://158.220.105.209:8080/';

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

    this.http.post(this.apiUrl, request).subscribe(response => {
      const result: any = response;
      console.log(result);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      console.log(this.params);
    });
  }
}
