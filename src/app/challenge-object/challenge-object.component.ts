import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-challenge-object',
  standalone: true,
  imports: [],
  templateUrl: './challenge-object.component.html',
  styleUrl: './challenge-object.component.scss'
})
export class ChallengeObjectComponent {
challengeSelect() {
throw new Error('Method not implemented.');
}
  @Input() name!: string;
  @Input() description!: string;
  @Input() version!: string;
  @Input() game!: string;
  @Input() uuid!: string;
}
