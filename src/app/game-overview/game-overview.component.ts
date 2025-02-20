import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-overview',
  standalone: true,
  imports: [],
  templateUrl: './game-overview.component.html',
  styleUrl: './game-overview.component.scss'
})
export class GameOverviewComponent implements OnInit {
  gameName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameName = params.get('name') || '';
      console.log("Game Name:", this.gameName);
    });
  }
}
