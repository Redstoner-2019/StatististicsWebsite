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

  sort: string = 'powerLeft';
  sortings: string[] = ["powerLeft", "death", "place"];

  versions: string[] = ["1.0.0", "1.1.0", "1.2.0", "1.3.0"];
  challenges: string[] = ["Ventablack", "Night 6",];

  entries: Entry[] = [
  ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  updateData() {
    const token: any = localStorage.getItem("token");

    const packet = {
      "pageNumber": 0,
      "pageSize": 5,
      "zeroIndex": true,
      "ascending": true,
      "sortBy": this.sort,
      "game": "45204620-e574-4253-841f-b2f24e2882ef",
      "challenge": "bf65f8c6-baca-4376-9c69-69b833e3ffca",
      "version": this.version
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const apiUrl = 'http://localhost:8082/stats/challengeEntry/getAllSorted';

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

      console.log(data);
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
