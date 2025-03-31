import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameObjectComponent } from '../game-object/game-object.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChallengeObjectComponent } from "../challenge-object/challenge-object.component";

@Component({
  selector: 'app-challenge-selector',
  standalone: true,
  imports: [CommonModule, GameObjectComponent, HttpClientModule, FormsModule, ChallengeObjectComponent],
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

  get filteredItems(): Challenge[] {
    return this.challenges.filter(challenge =>
      challenge.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
  
      const apiUrl = 'http://localhost:8082/stats/challenges/getAll';
  
      this.http.post(apiUrl, packet, {headers}).subscribe((response) => {
        const result: any = response;
  
        for(const challenge of result){
  
          const convertedChallenge: Challenge = {
            uuid: challenge.id,
            name: challenge.name,
            description: challenge.description,
            game: this.params.game,
            version: this.params.version
          }
  
          this.challenges.push(convertedChallenge);
        }
      });
    });
  }
}

export interface Challenge {
  name: string;
  description: number;
  version: string;
  game: string;
  uuid: string;
}

