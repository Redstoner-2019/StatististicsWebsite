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

  games: {name: string; players:number; id: string}[] = [

  ];

  runs: {name: string; scoreText:number; id: string}[] = [

  ];

  visibleGames: {name:string; players: number; id:string;}[] = [];
  visibleRuns: {name:string; scoreText: number; id:string;}[] = [];

  loadingmsg = "Loading...";
  loadingmsgrun = "Loading...";

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

    let request:any = {
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
          /*{ name: 'Minecraft', players: 0, id:"uuid"},
          { name: 'Minecraft 1', players: 1, id:"uuid"},
          { name: 'Minecraft 2', players: 2, id:"uuid"},*/
        ];

        this.loadingmsg = "No games found."

        this.containerWidth = this.containerDiv.nativeElement.clientWidth;
        const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);
        this.visibleGames = this.games.slice(0, itemsThatFit);
      }
    );

    request = {

    }

    this.http.post("http://localhost:8082/stats/recentRuns/getAll", request, {headers} ).subscribe(
      (data) => {
        this.runs = [];
        const result:any = data;
          result.forEach((element: any) => {
            let run = {
              name: element.name,
              scoreText: 1,
              id: element.id
            }
            this.runs.push(run);
          });

          this.containerWidth = this.containerDiv.nativeElement.clientWidth;
          let itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);

          if(itemsThatFit < 4) itemsThatFit = 4;

          console.log(itemsThatFit);
      
          this.visibleRuns = this.runs.slice(0, itemsThatFit);

          if(this.visibleRuns.length === 0) this.loadingmsgrun = "No games found."
      },
      (error) => {
        console.log(error);

        /*this.runs = [
          { name: 'Run', scoreText: 0, id:"uuid"},
          { name: 'Run 1', scoreText: 1, id:"uuid"},
          { name: 'Run 2', scoreText: 2, id:"uuid"},
        ];*/

        this.loadingmsgrun = "No runs found."

        this.containerWidth = this.containerDiv.nativeElement.clientWidth;
        const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);
        this.visibleRuns = this.runs.slice(0, itemsThatFit);
      }
    );
  }
}
