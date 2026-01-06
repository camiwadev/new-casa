import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services1.html',
  styleUrl: './services1.scss',
})
export class Services1 {
  constructor(public router: Router) {}

}
