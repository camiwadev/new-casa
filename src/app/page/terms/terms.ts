import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms {
  constructor() { }

}
