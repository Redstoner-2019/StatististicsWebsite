import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent {
  gameUUID = "5be56dfa-4480-cc1b-1481-f09593adac79";
  versionName = "1.5.1";
  versionEnabled = true;

  buttonsEnabled = JSON.parse("{}");

  async onChallengeVersionGet(){
    const params = new URLSearchParams({
      challengeId: this.gameUUID,
      versionName: this.versionName
    });
    let request = await fetch(environment.statsUrl + `/stats/challenge/version/get?${params}` , {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },

      });
      this.versionEnabled = request.status == 200;
  }

  async onChallengeVersionUpdate(){
    const params = new URLSearchParams({
      challengeId: this.gameUUID,
      versionName: this.versionName,
      en: this.versionEnabled.toString()
    });
    let request = await fetch(environment.statsUrl + `/stats/challenge/version/update?${params}` , {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },

      });
  }

  update() {
    if(this.gameUUID != "" && this.versionName != "" ){
      this.buttonsEnabled.versionChallenge = true;
    } else {
      this.buttonsEnabled.versionChallenge = false;
    }
    console.log(this.buttonsEnabled);
  }

  constructor() {
    setInterval(() => this.update(), 100);
  }
}
