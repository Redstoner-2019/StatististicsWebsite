import { HttpClient } from '@angular/common/http';
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

  sort: string = '';
  sortings: string[] = ["powerLeft", "death", "place"];

  versions: string[] = ["1.0.0", "1.1.0", "1.2.0", "1.3.0"];
  challenges: string[] = ["Ventablack", "Night 6",];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
      this.game = params['game'];
      this.version = params['version'];
      this.challenge = params['challenge'];
    });
  }
}
