import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameObjectComponent } from '../game-object/game-object.component';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  games: {name: string; creator:string; id: string; imageUrl:string;}[] = [

  ];

  runs: {name: string; scoreText:number; id: string; imageUrl:string;}[] = [

  ];

  visibleGames: {name:string; creator: string; id:string; imageUrl:string;}[] = [];
  visibleRuns: {name:string; scoreText: number; id:string; imageUrl:string;}[] = [];

  loadingmsg = "Loading...";
  loadingmsgrun = "Loading...";

  itemWidth = 210;
  containerWidth = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateData();
      this.updateVisibleItems();
    }, 250);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleItems();
  }

  updateData(){
    let token:any = localStorage.getItem("token");

    let request:any = {
        test:"test"
    }

    if(token == null) token = "";

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    this.http.post(environment.statsUrl + "/stats/game/getAll", request, {headers} ).subscribe(
      (data) => {
        this.games = [];
        const result:any = data;
          result.forEach((element: any) => {
            let game = {
              name: element.name,
              creator: element.owner,
              id: element.id,
              imageUrl: element.icon
            }
            if(element.imageUrl) game.imageUrl = element.imageUrl;
            this.games.push(game);
          });

          this.containerWidth = this.containerDiv.nativeElement.clientWidth;
          let itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);

          if(itemsThatFit < 4) itemsThatFit = 4;
      
          this.visibleGames = this.games.slice(0, itemsThatFit);

          if(this.visibleGames.length === 0) this.loadingmsg = "No games found."
      },
      (error) => {
        if(error.status === 403) {
          this.loadingmsg = "Not logged in. Please login to view data."
        } else if(error.status === 0) {
          this.loadingmsg = "Connection failed."
        } else {
          this.loadingmsg = "An error occured."
          console.log(error);
        }

        this.containerWidth = this.containerDiv.nativeElement.clientWidth;
        const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);
        this.visibleGames = this.games.slice(0, itemsThatFit);
      }
    );

    request = {

    }

    this.http.post(environment.statsUrl + "/stats/recentRuns/getAll", request, {headers} ).subscribe(
      (data) => {
        this.runs = [];
        const result:any = data;
          result.forEach((element: any) => {
            let run = {
              name: element.name,
              scoreText: 1,
              id: element.id,
              imageUrl:  element.icon
            }
            if(element.imageUrl) run.imageUrl = element.imageUrl;
            this.runs.push(run);
          });

          this.containerWidth = this.containerDiv.nativeElement.clientWidth;
          let itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);

          if(itemsThatFit < 4) itemsThatFit = 4;
      
          this.visibleRuns = this.runs.slice(0, itemsThatFit)

          if(this.visibleRuns.length === 0) this.loadingmsgrun = "No games found."
      },
      (error) => {
        if(error.status === 403) {
          this.loadingmsgrun = "Not logged in. Please login to view data."
        } else if(error.status === 0) {
          this.loadingmsgrun = "Connection failed."
        } else {
          this.loadingmsgrun = "An error occured."
          console.log(error);
        }

        this.containerWidth = this.containerDiv.nativeElement.clientWidth;
        const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);
        this.visibleRuns = this.runs.slice(0, itemsThatFit);
      }
    );
  }

  updateVisibleItems() {
    if (!this.containerDiv) return;

    this.containerWidth = this.containerDiv.nativeElement.clientWidth;
    const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);
    this.visibleRuns = this.runs.slice(0, itemsThatFit);
  }
}
