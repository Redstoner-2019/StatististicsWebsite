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

  games: Game[] = [];

  constructor(private http: HttpClient) {
    const token: any = localStorage.getItem("token");

    const packet = {
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const apiUrl = 'http://localhost:8082/stats/game/getAll';

    this.http.post(apiUrl, packet, {headers}).subscribe((response) => {
      const result: any = response;

      for(const game of result){
        console.log(game);

        const convertedGame: Game = {
          id: game.id,
          name: game.name,
          players: 3,
          imageUrl: game.icon
        }

        this.games.push(convertedGame);
      }
    });
  }

  loadingmsg = "Loading...";

  searchTerm: string = '';

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

