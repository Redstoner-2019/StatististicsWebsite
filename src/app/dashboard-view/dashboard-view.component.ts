import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GameObjectComponent } from '../game-object/game-object.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule, GameObjectComponent],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})

export class DashboardViewComponent {
  @ViewChild('containerDiv') containerDiv!: ElementRef;

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

  itemWidth = 210;
  containerWidth = 0;

  ngAfterViewInit() {
    this.updateVisibleItems();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleItems();
  }

  updateVisibleItems() {
    if (!this.containerDiv) return;

    this.containerWidth = this.containerDiv.nativeElement.clientWidth;
    const itemsThatFit = Math.floor(this.containerWidth / this.itemWidth);

    //console.log(itemsThatFit);
    //console.log(this.games);
    //console.log(this.games.slice(0, itemsThatFit));

    this.visibleGames = this.games.slice(0, itemsThatFit);
  }
}
