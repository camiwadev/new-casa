import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services3.html',
  styleUrl: './services3.scss',
})
export class Services3 {
  constructor(public router: Router) {}

}
