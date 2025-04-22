import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChallengeObjectComponent } from "../challenge-object/challenge-object.component";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-challenge-selector',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChallengeObjectComponent],
  templateUrl: './challenge-selector.component.html',
  styleUrl: './challenge-selector.component.scss'
})
export class ChallengeSelectorComponent {
  params: any | null = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    }

  loadingmsg = "Loading...";

  searchTerm: string = '';

  challenges: Challenge[] = [];

  filteredItems(): Challenge[] {
    console.log(this.challenges);
    //return [];
    return this.challenges;
    /*return this.challenges.filter(challenge =>
      challenge.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );*/
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      
      const token: any = localStorage.getItem("token");
  
      const packet = {
        "game": this.params.game,
        "version": this.params.version
      };
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      });
  
      const apiUrl = environment.statsUrl + '/stats/challenges/getAll';
  
      this.http.post(apiUrl, packet, {headers}).subscribe((response) => {
        const result: any = response;
  
        for(const challenge of result){
  
          const convertedChallenge: Challenge = {
            name: challenge.name,
            description: challenge.description,
            version: this.params.version,
            game: this.params.game,
            uuid: challenge.id
          }
  
          //console.log(convertedChallenge);
          this.challenges.push(convertedChallenge);
        }
      });
    });
  }
}

export interface Challenge {
  name: string;
  description: string;
  version: string;
  game: string;
  uuid: string;
}

