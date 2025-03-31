import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-entry',
  standalone: true,
  imports: [],
  templateUrl: './stat-entry.component.html',
  styleUrl: './stat-entry.component.scss'
})
export class StatEntryComponent {
  @Input() place!: string[];
  @Input() username!: string[];
  @Input() value!: string[];
  @Input() date!: string[];
}
