import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameObjectComponent } from '../game-object/game-object.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenge-selector',
  standalone: true,
  imports: [CommonModule, GameObjectComponent, HttpClientModule, FormsModule],
  templateUrl: './challenge-selector.component.html',
  styleUrl: './challenge-selector.component.scss'
})
export class ChallengeSelectorComponent {

  loadingmsg = "Loading...";

  searchTerm: string = '';

  challenges: Challenge[] = [
    { id: 'test', name: 'Ventablack', players: 3, imageUrl: 'default.png', description: "description test"},
    { id: 'test', name: 'Ventablack Endless', players: 3, imageUrl: 'default.png', description: "description test"},
    { id: 'test', name: 'Night 6', players: 3, imageUrl: 'default.png', description: "description test"},
    { id: 'test', name: 'Night 6 Endless', players: 3, imageUrl: 'default.png', description: "description test"},
    { id: 'test', name: '4/20', players: 3, imageUrl: 'default.png', description: "description test"},
    { id: 'test', name: '4/20 Endless', players: 3, imageUrl: 'default.png', description: "description test"},
  ];

  get filteredItems(): Challenge[] {
    return this.challenges.filter(challenge =>
      challenge.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

export interface Challenge {
  id: string,
  name: string;
  players: number;
  imageUrl: string;
  description: string;
}

