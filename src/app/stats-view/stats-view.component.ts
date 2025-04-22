import { Challenge } from './../challenge-selector/challenge-selector.component';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { StatEntryComponent } from "../stat-entry/stat-entry.component";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-stats-view',
  standalone: true,
  imports: [FormsModule, CommonModule, StatEntryComponent, HttpClientModule],
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
  challenges: ChallengeI[] = [
    {
      displayname: "Night 6",
      uuid: "test6"
    },
    {
      displayname: "Ventablack",
      uuid: "venta"
    }
  ];

  entries: Entry[] = [
  ];

  page = 0;
  maxpages = 2;
  pageSize = 10;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  pageMinus(){
    this.page--;
    if(this.page < 0) this.page = 0;
    this.updateData();
  }

  pagePlus(){
    this.page++;
    if(this.page >= this.maxpages) this.page = this.maxpages-1;
    this.updateData();
  }

  switchToChallenge(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    this.challenge = selectedValue.toString();
    this.updateData();
  }

  updateData() {
    if(this.game == "") {
      this.router.navigate(["/dashboard"], { queryParams: { tab: "games" } });
      return;
    }

    const token: any = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    let apiUrl = environment.statsUrl + '/stats/challenges/getAll';

    this.challenges = [];

    let packetAllChallenges = {
      "game": this.game,
      "version": this.version
    };

    this.http.post(apiUrl, packetAllChallenges, {headers}).subscribe((response) => {
      const result: any = response;

      for(const challenge of result){
        let cha: ChallengeI = {
          displayname: challenge.name,
          uuid: challenge.id
        };

        this.challenges.push(cha);

        if(this.challenge == "") {
          this.challenge = cha.uuid;
        }
      }

      apiUrl = environment.statsUrl + '/stats/game/get';

      this.http.post(apiUrl, packetGame, {headers}).subscribe((response) => {
        const result: any = response;
        this.gameDisplay = result.name;
      });

      let packetChallenge = {
        "uuid": this.challenge
      };

      apiUrl = environment.statsUrl + '/stats/challenges/get';

      this.http.post(apiUrl, packetChallenge, {headers}).subscribe((response) => {
        const result: any = response;
        this.challengeDisplay = result.name;
      });

      let packet = {
        "pageNumber": this.page,
        "pageSize": this.pageSize,
        "zeroIndex": true,
        "ascending": true,
        "sortBy": this.sort,
        "game": this.game,
        "challenge": this.challenge,
        "version": this.version
      };

      apiUrl = environment.statsUrl + '/stats/challengeEntry/getAllSorted';

      this.http.post(apiUrl, packet, {headers}).subscribe((response) => {
        const result: any = response;

        const data = result.result;

        let i:number = 0;

        this.entries = [];
        this.maxpages = result.pages;

        for(const entry of data){
          i++;

          const e: Entry = {
            place: (i + (this.page * this.pageSize)).toString(),
            username: entry.username.toString(),
            value: entry.data[this.sort].toString(),
            date: entry.created.toString()
          }

          this.entries.push(e);
        }
      });
    });

    let packetGame = {
      "uuid": this.game
    };

    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      if(params["game"] != undefined) this.game = params['game']; else this.game = "";
      if(params["version"] != undefined) this.version = params['version']; else this.version = "";
      if(params["challenge"] != undefined) this.challenge = params['challenge']; else this.challenge = "";
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

interface ChallengeI {
  displayname: string,
  uuid: string
}
