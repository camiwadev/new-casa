import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimePortfolioService } from '../../services/portfolio-realtime.service';
import { Subscription } from 'rxjs';
import { Portfolio } from '../../models/portfolio.interface';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit, OnDestroy {
  isBrowser: boolean = false;
  portfolios: Portfolio[] = [];
  filteredPortfolios: Portfolio[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    private realtimePortfolioService: RealtimePortfolioService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    window.scrollTo(0, 0);

    // Subscribe to portfolio updates
    this.subscription.add(
      this.realtimePortfolioService.portfolios$.subscribe(portfolios => {
        this.portfolios = portfolios;
        this.filteredPortfolios = portfolios; // Initially show all
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    window.scrollTo(0, 0);
  }

  getImageUrl(portfolio: Portfolio): string {
    if (portfolio.images && portfolio.images.length > 0) {
      return this.realtimePortfolioService.getFileUrl(portfolio, portfolio.images[0]);
    }
    return '';
  }

  filterPortfolios(type: string): void {
    if (type === 'all') {
      this.filteredPortfolios = this.portfolios;
    } else {
      this.filteredPortfolios = this.portfolios.filter(portfolio => portfolio.tag === type);
    }
  }
}
