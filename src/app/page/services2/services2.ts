import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services2.html',
  styleUrl: './services2.scss',
})
export class Services2 {
  constructor(public router: Router) {}

}
