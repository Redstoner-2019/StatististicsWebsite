import { Component, Input } from '@angular/core';

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
}
