import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameObjectComponent } from '../game-object/game-object.component';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule, GameObjectComponent, HttpClientModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})

export class DashboardViewComponent {
  @ViewChild('containerDiv') containerDiv!: ElementRef;

  constructor(private http: HttpClient) { }

  games = [
    { name: 'Minecraft', players: 0, id:"uuid"},
    { name: 'Minecraft 1', players: 1, id:"uuid"},
    { name: 'Minecraft 2', players: 2, id:"uuid"},
    { name: 'Minecraft 3', players: 2, id:"uuid"},
    { name: 'Minecraft 4', players: 2, id:"uuid"},
    { name: 'Minecraft 5', players: 2, id:"uuid"},
    { name: 'Minecraft 6', players: 2, id:"uuid"},
  ];

  visibleGames: {name:string; players: number; id:string;}[] = [];

  loadingmsg = "Loading..."

  itemWidth = 210;
  containerWidth = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateVisibleItems();
    }, 250);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleItems();
  }

  updateVisibleItems() {
    if (!this.containerDiv) return;

    let token:any = localStorage.getItem("token");

    let request = {
        test:"test"
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    this.http.post("http://localhost:8082/stats/game/getAll", request, {headers} ).subscribe(
      (data) => {
        this.games = [];
        const result:any = data;
          result.forEach((element: any) => {
            let game = {
              name: element.name,
              players: 1,
              id: element.id
            }
            this.games.push(game);
          });

          this.containerWidth = this.containerDiv.nativeElement.clientWidth;
          let itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);

          if(itemsThatFit < 4) itemsThatFit = 4;

          console.log(itemsThatFit);
      
          this.visibleGames = this.games.slice(0, itemsThatFit);

          if(this.visibleGames.length === 0) this.loadingmsg = "No games found."
      },
      (error) => {
        console.log(error);

        this.games = [
          { name: 'Minecraft', players: 0, id:"uuid"},
          { name: 'Minecraft 1', players: 1, id:"uuid"},
          { name: 'Minecraft 2', players: 2, id:"uuid"},
          { name: 'Minecraft 3', players: 2, id:"uuid"},
          { name: 'Minecraft 4', players: 2, id:"uuid"},
          { name: 'Minecraft 5', players: 2, id:"uuid"},
          { name: 'Minecraft 6', players: 2, id:"uuid"},
        ];

        this.containerWidth = this.containerDiv.nativeElement.clientWidth;
          const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);
      
          this.visibleGames = this.games.slice(0, itemsThatFit);
      }
    );
  }
}
