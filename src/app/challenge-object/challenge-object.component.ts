import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-challenge-object',
  standalone: true,
  imports: [],
  templateUrl: './challenge-object.component.html',
  styleUrl: './challenge-object.component.scss'
})
export class ChallengeObjectComponent {

  constructor(private router: Router, private dashboard:DashboardComponent) {
    }
  
    challengeSelect(){
      this.dashboard.tab = "challenges";
      this.router.navigate(["/stats"], { queryParams: { game: this.game,challenge: this.uuid , version: this.version } });
    }

  @Input() name!: string;
  @Input() description!: string;
  @Input() version!: string;
  @Input() game!: string;
  @Input() uuid!: string;
}
