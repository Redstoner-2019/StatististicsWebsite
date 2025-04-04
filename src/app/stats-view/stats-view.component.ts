import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { StatEntryComponent } from "../stat-entry/stat-entry.component";

@Component({
  selector: 'app-stats-view',
  standalone: true,
  imports: [FormsModule, CommonModule, StatEntryComponent],
  templateUrl: './stats-view.component.html',
  styleUrl: './stats-view.component.scss'
})
export class StatsViewComponent {
  params: any | null = {};

  game = "";
  version = "";
  challenge = "";

  gameDisplay = "Loading...";
  challengeDisplay = "Loading...";

  sort: string = 'powerLeft';
  sortings: string[] = ["powerLeft", "death", "place"];

  versions: string[] = ["1.0.0", "1.1.0", "1.2.0", "1.3.0"];
  challenges: string[] = ["Ventablack", "Night 6",];

  entries: Entry[] = [
  ];

  challengeMapping: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  updateData() {
    const token: any = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    this.challenges = [];

    let packetAllChallenges = {
      "game": this.game,
      "version": this.version
    };

    console.log(packetAllChallenges);

    let apiUrl = 'http://localhost:8082/stats/challenges/getAll';

    this.http.post(apiUrl, packetAllChallenges, {headers}).subscribe((response) => {
      const result: any = response;
      this.challengeDisplay = result.name;

      for(const challenge of result){
        this.challenges.push(challenge.name);

        this.challengeMapping[challenge.name] = challenge.id;
      }
    });

    let packetGame = {
      "uuid": this.game
    };

    apiUrl = 'http://localhost:8082/stats/game/get';

    this.http.post(apiUrl, packetGame, {headers}).subscribe((response) => {
      const result: any = response;
      this.gameDisplay = result.name;
    });

    let packetChallenge = {
      "uuid": this.challenge
    };

    apiUrl = 'http://localhost:8082/stats/challenges/get';

    this.http.post(apiUrl, packetChallenge, {headers}).subscribe((response) => {
      const result: any = response;
      this.challengeDisplay = result.name;
    });

    setTimeout(function() {

    },500)

    this.challenge = this.challengeMapping[this.challengeDisplay];

    let packet = {
      "pageNumber": 0,
      "pageSize": 5,
      "zeroIndex": true,
      "ascending": true,
      "sortBy": this.sort,
      "game": this.game,
      "challenge": this.challenge,
      "version": this.version
    };

    apiUrl = 'http://localhost:8082/stats/challengeEntry/getAllSorted';

    this.http.post(apiUrl, packet, {headers}).subscribe((response) => {
      const result: any = response;

      const data = result.result;

      let i:number = 0;

      this.entries = [];

      for(const entry of data){
        i++;

        const e: Entry = {
          place: i.toString(),
          username: entry.username.toString(),
          value: entry.data[this.sort].toString(),
          date: entry.created.toString()
        }

        this.entries.push(e);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      this.game = params['game'];
      this.version = params['version'];
      this.challenge = params['challenge'];
    });

    this.updateData();
  }
}

interface Entry {
  place: string,
  username: string,
  value: string,
  date: string
}
