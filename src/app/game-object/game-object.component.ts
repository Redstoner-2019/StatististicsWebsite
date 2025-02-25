import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-game-object',
  standalone: true,
  imports: [],
  templateUrl: './game-object.component.html',
  styleUrl: './game-object.component.scss'
})
export class GameObjectComponent {
  @Input() name!: string;
  @Input() players!: number;
  @Input() uuid!: string;
  @Input() imageUrl!: string;

  constructor(private router: Router, private dashboard:DashboardComponent) {
  }

  challenges(){
    this.dashboard.tab = "challenges";
    this.router.navigate(["/dashboard"], { queryParams: { game: this.uuid } });
  }
}
