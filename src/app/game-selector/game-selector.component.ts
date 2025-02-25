import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameObjectComponent } from '../game-object/game-object.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-selector',
  standalone: true,
  imports: [CommonModule, GameObjectComponent, HttpClientModule, FormsModule],
  templateUrl: './game-selector.component.html',
  styleUrl: './game-selector.component.scss'
})
export class GameSelectorComponent {

  loadingmsg = "Loading...";

  searchTerm: string = '';

  games: Game[] = [
    { id: 'test1', name: 'FNaF', players: 3, imageUrl: 'default.png'},
    { id: 'test2', name: 'FNaF 2', players: 3, imageUrl: 'default.png'},
    { id: 'test3', name: 'FNaF 3', players: 3, imageUrl: 'default.png'},
    { id: 'test3', name: 'FNaF 4', players: 3, imageUrl: 'default.png'},
    { id: 'test3', name: 'FNaF 5', players: 3, imageUrl: 'default.png'},
    { id: 'test3', name: 'FNaF 6', players: 3, imageUrl: 'default.png'},
    { id: 'test3', name: 'FNaF 7', players: 3, imageUrl: 'default.png'},
    { id: 'test3', name: 'FNaF 8', players: 3, imageUrl: 'default.png'},
  ];

  get filteredItems(): Game[] {
    return this.games.filter(game =>
      game.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

export interface Game {
  id: string,
  name: string;
  players: number;
  imageUrl: string;
}

