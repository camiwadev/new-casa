import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services3.html',
  styleUrl: './services3.scss',
})
export class Services3 {
isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
 ngOnInit(): void {
        if (!this.isBrowser) return;

      window.scrollTo(0, 0);
  }
  ngAfterViewInit(): void {
      if (!this.isBrowser) return;

    window.scrollTo(0, 0);
  }
}
